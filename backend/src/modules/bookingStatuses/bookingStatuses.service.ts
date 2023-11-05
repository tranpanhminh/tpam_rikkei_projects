import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookingStatusesRepository } from './bookingStatuses.repository';
import { BookingStatusesEntity } from './database/entity/bookingStatuses.entity';
import { CreateBookingStatusDTO } from './dto/createBookingStatus.dto';
import { UpdateBookingStatusDTO } from './dto/updateBookingStatus.dto';

@Injectable()
export class BookingStatusesService {
  constructor(
    private readonly bookingStatusesRepository: BookingStatusesRepository,
  ) {}

  // 1. Get All
  async getAllBookingStatuses() {
    const result = await this.bookingStatusesRepository.getAllBookingStatuses();
    return result;
  }

  // 2. Get Detail
  async getDetailBookingStatus(
    id: number,
  ): Promise<BookingStatusesEntity | unknown> {
    const detailBookingStatus: BookingStatusesEntity | unknown =
      await this.bookingStatusesRepository.getDetailBookingStatus(id);
    if (detailBookingStatus) {
      return detailBookingStatus;
    }
  }

  // 3. Add
  async addBookingStatus(
    body: CreateBookingStatusDTO,
  ): Promise<BookingStatusesEntity | unknown> {
    const { name } = body;
    const newBookingStatus = {
      name: name,
    };
    await this.bookingStatusesRepository.addBookingStatus(newBookingStatus);
    return new HttpException('BookingStatus Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteBookingStatus(
    id: number,
  ): Promise<BookingStatusesEntity | unknown> {
    const checkBookingStatus =
      await this.bookingStatusesRepository.getDetailBookingStatus(id);
    if (checkBookingStatus) {
      await this.bookingStatusesRepository.deleteBookingStatus(id);
      return new HttpException('BookingStatus Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updateBookingStatus(
    id: number,
    body: UpdateBookingStatusDTO,
  ): Promise<BookingStatusesEntity | unknown> {
    const { name } = body;
    const checkBookingStatus: BookingStatusesEntity =
      await this.bookingStatusesRepository.getDetailBookingStatus(id);
    if (checkBookingStatus) {
      const updateBookingStatus = {
        name: !name ? checkBookingStatus.name : name,
      };
      await this.bookingStatusesRepository.updateBookingStatus(
        id,
        updateBookingStatus,
      );
      return new HttpException('BookingStatus Updated', HttpStatus.OK);
    }
  }
}
