import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { BookingsRepository } from 'src/modules/bookings/bookings.repository';

@Injectable()
export class CheckBookingStatusBeforeCancel implements NestMiddleware {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const findBooking = await this.bookingsRepository.getDetailBooking(getId);
    if (findBooking.status_id == 2 || findBooking.status_id == 3) {
      throw new BadRequestException(
        "You can't cancelled because it status is not in Pending status",
      );
    }

    if (findBooking.status_id == 4) {
      throw new BadRequestException(
        "You can't cancelled because it has cancelled before",
      );
    }
    next();
  }
}
