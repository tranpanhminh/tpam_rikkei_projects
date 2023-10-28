import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookingStatusesRepository } from 'src/modules/bookingStatuses/bookingStatuses.repository';

@Injectable()
export class CheckBookingStatusExist implements NestInterceptor {
  constructor(private bookingStatusesRepository: BookingStatusesRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find =
      await this.bookingStatusesRepository.getDetailBookingStatus(getId);
    if (!find) {
      throw new NotFoundException('Booking Status ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
