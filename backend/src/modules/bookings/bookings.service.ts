import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';
import { BookingsEntity } from './database/entity/bookings.entity';
import { CreateBookingDTO } from './dto/createBooking.dto';
import { ServicesRepository } from '../services/services.repository';
import { BookingsInterface } from './interface/bookings.interface';
import { UpdateBookingDTO } from './dto/updateBooking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
    private readonly servicesRepository: ServicesRepository,
  ) {}

  // 1. Get All
  async getAllBookings() {
    const result = await this.bookingsRepository.getAllBookings();
    return result;
  }

  // 2. Get Detail
  async getDetailBooking(id: number): Promise<BookingsEntity | unknown> {
    const detailBooking: BookingsEntity | unknown =
      await this.bookingsRepository.getDetailBooking(id);
    if (detailBooking) {
      return detailBooking;
    }
  }

  // 3. Add
  async addBooking(
    userId,
    serviceId,
    body: CreateBookingDTO,
  ): Promise<BookingsEntity | unknown> {
    const { name, phone, booking_date, calendar } = body;
    const findService =
      await this.servicesRepository.getDetailService(serviceId);
    const copyServiceInfo = { ...findService };
    const newBooking: BookingsInterface = {
      user_id: userId,
      service_id: serviceId,
      name: name,
      phone: phone,
      service_name: copyServiceInfo.name,
      service_description: copyServiceInfo.description,
      service_price: copyServiceInfo.price,
      service_image: copyServiceInfo.service_image,
      booking_date: booking_date,
      calendar: calendar,
      status_id: 1,
    };
    await this.bookingsRepository.addBooking(newBooking);
    return new HttpException('Booking Added', HttpStatus.OK);
  }

  // 4. Filter Booking By User ID
  async filterBookingByUserId(userId) {
    const result = await this.bookingsRepository.filterBookingByUserId(userId);
    return result;
  }

  // 4. Cancel Booking
  async cancelBooking(id: number): Promise<BookingsEntity | unknown> {
    const checkBooking = await this.bookingsRepository.getDetailBooking(id);
    if (checkBooking) {
      const updateBooking = {
        status_id: 4,
      };
      await this.bookingsRepository.cancelBooking(id, updateBooking);
      return new HttpException('Booking Cancelled', HttpStatus.OK);
    }
  }

  // 6. Update Booknig For Admin
  async updateBooking(
    id: number,
    body: UpdateBookingDTO,
  ): Promise<BookingsEntity | unknown> {
    const { status_id } = body;
    const checkBooking: BookingsEntity =
      await this.bookingsRepository.getDetailBooking(id);
    if (checkBooking) {
      const updateBooking = {
        status_id: !status_id ? status_id : status_id,
      };
      await this.bookingsRepository.updateBooking(id, updateBooking);
      return new HttpException('Booking Updated', HttpStatus.OK);
    }
  }

  // 7. Group Booking Date
  async groupBookingDate() {
    const result = await this.bookingsRepository.groupBookingDate();
    return result;
  }

  // 7. Group Booking Date
  async reportBooking() {
    const result = await this.bookingsRepository.reportBooking();
    return result;
  }
}
