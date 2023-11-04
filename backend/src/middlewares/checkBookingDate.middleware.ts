import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class CheckBookingDate implements NestMiddleware {
  constructor(private readonly usersRepository: UsersRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const booking_date = req.body.booking_date;
    const bookingDate = new Date(booking_date);
    const currentDate = new Date();
    if (bookingDate < currentDate) {
      throw new BadRequestException("You can't book a date in the past.");
    }

    const dayOfWeek = bookingDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      throw new BadRequestException("You can't book on Saturday & Sunday");
    }
    next();
  }
}
