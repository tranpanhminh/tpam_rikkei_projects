import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaymentsRepository } from 'src/modules/payments/payments.repository';

@Injectable()
export class CheckPaymentExist implements NestInterceptor {
  constructor(private paymentsRepository: PaymentsRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find = await this.paymentsRepository.getDetailPayment(getId);
    if (!find) {
      throw new NotFoundException('Payment ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
