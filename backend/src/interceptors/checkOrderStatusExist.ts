import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderStatusesRepository } from 'src/modules/orderStatuses/orderStatuses.repository';

@Injectable()
export class CheckOrderStatusExist implements NestInterceptor {
  constructor(private orderStatusesRepository: OrderStatusesRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find = await this.orderStatusesRepository.getDetailOrderStatus(getId);
    if (!find) {
      throw new NotFoundException('Order Status ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
