import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { BookingsRepository } from 'src/modules/bookings/bookings.repository';

@Injectable()
export class CheckkBookingAvailable implements NestMiddleware {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const booking_date = req.body.booking_date;
    const maxBooking = 20;

    const filterBookingByDate =
      await this.bookingsRepository.filterBookingByDate(booking_date);
    if (filterBookingByDate) {
      const transformedData = await filterBookingByDate.map((item) => item);
      if (transformedData[0]?.total_booking >= maxBooking) {
        throw new BadRequestException('Full Booking on this day');
      }
    }
    next();
  }
}
