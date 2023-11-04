import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { BookingsRepository } from 'src/modules/bookings/bookings.repository';

@Injectable()
export class CheckBookingStatusAcceptForAdmin implements NestMiddleware {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getBookingId = req.params.id;
    const getStatus = req.body.status_id;
    const findBooking =
      await this.bookingsRepository.getDetailBooking(getBookingId);

    if (findBooking.status_id > getStatus) {
      throw new NotAcceptableException(
        "You can't change previous booking status",
      );
    }

    if (findBooking.status_id == 4) {
      throw new NotAcceptableException(
        "You can't change status because this order has cancelled",
      );
    }

    next();
  }
}
