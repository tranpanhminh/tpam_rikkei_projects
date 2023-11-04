import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { BookingsRepository } from 'src/modules/bookings/bookings.repository';

@Injectable()
export class CheckBookingBooked implements NestMiddleware {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getUserId = req.params.userId;
    const getServiceId = req.params.id;
    const booking_date = req.body.booking_date;
    const calendar = req.body.calendar;

    const checkBooking = await this.bookingsRepository.checkBooking(
      getUserId,
      getServiceId,
      booking_date,
      calendar,
    );
    if (checkBooking) {
      throw new BadRequestException(
        'You already booked this day and this time',
      );
    }

    next();
  }
}
