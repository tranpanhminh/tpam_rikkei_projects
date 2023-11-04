import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { BookingStatusesRepository } from 'src/modules/bookingStatuses/bookingStatuses.repository';

@Injectable()
export class CheckBookingStatusExist implements NestMiddleware {
  constructor(
    private readonly bookingStatusesRepository: BookingStatusesRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const statusId = req.params.id;
    const getAll = await this.bookingStatusesRepository.getAllBookingStatuses();
    const allStatuses = getAll.map((status) => {
      return status.id.toString();
    });
    if (!allStatuses.includes(statusId)) {
      throw new NotFoundException('Booking Status ID is not found');
    }

    next();
  }
}
