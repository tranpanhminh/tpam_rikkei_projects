import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { BookingsRepository } from 'src/modules/bookings/bookings.repository';

@Injectable()
export class CheckBookingExist implements NestMiddleware {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const findUser = await this.bookingsRepository.getDetailBooking(getId);
    if (!findUser) {
      throw new NotFoundException('Booking ID is not found');
    }
    next();
  }
}
