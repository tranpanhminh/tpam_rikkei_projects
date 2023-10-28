import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CancelReasonsRepository } from 'src/modules/cancelReasons/cancelReasons.repository';

@Injectable()
export class CheckCancelReasonExist implements NestInterceptor {
  constructor(private cancelReasonsRepository: CancelReasonsRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find =
      await this.cancelReasonsRepository.getDetailCancelReason(getId);
    if (!find) {
      throw new NotFoundException('Coupon ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
