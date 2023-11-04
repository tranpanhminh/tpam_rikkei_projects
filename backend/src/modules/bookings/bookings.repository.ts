import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingsEntity } from './database/entity/bookings.entity';
import { BookingsInterface } from './interface/bookings.interface';

@Injectable()
export class BookingsRepository {
  constructor(
    @InjectRepository(BookingsEntity)
    public bookingsEntity: Repository<BookingsEntity>,
  ) {}

  // 1. Get All
  async getAllBookings() {
    return await this.bookingsEntity.find({
      relations: { booking_statuses: true },
    });
  }

  // 2. Get Detail
  async getDetailBooking(id: number): Promise<BookingsEntity> {
    const detailBooking = await this.bookingsEntity.findOne({
      where: { id: id },
      relations: { booking_statuses: true },
    });
    return detailBooking;
  }

  // 3. Add
  async addBooking(
    newBooking: BookingsInterface,
  ): Promise<BookingsEntity | unknown> {
    return await this.bookingsEntity.save(newBooking);
  }

  // 3.1. Check Booking Booked
  async checkBooking(
    userId,
    serviceId,
    booking_date,
    calendar,
  ): Promise<BookingsEntity | unknown> {
    const checkBooking = await this.bookingsEntity.findOne({
      where: {
        user_id: userId,
        service_id: serviceId,
        booking_date: booking_date,
        calendar: calendar,
      },
    });
    return checkBooking;
  }

  // 3.2. Filter Booking By Date
  async filterBookingByDate(booking_date) {
    const bookings = await this.bookingsEntity
      .createQueryBuilder('booking')
      .select('booking.booking_date', 'date')
      .addSelect('COUNT(booking.id)', 'total_bookings')
      .where('booking.booking_date = :date', { date: booking_date })
      .groupBy('booking.booking_date')
      .getRawMany();
    return bookings;
  }

  // 4. Filter Booking By User ID
  async filterBookingByUserId(userId) {
    const bookings = await this.bookingsEntity.find({
      where: { user_id: userId },
    });
    return bookings;
  }

  // 5. Cancel Booking
  async cancelBooking(
    id: number,
    updateBooking: BookingsInterface,
  ): Promise<BookingsEntity | unknown> {
    return await this.bookingsEntity.update(id, updateBooking);
  }

  // 6. Update
  async updateBooking(
    id: number,
    updateBooking: BookingsInterface,
  ): Promise<BookingsEntity | unknown> {
    return await this.bookingsEntity.update(id, updateBooking);
  }

  // 7. Group Booking Date
  async groupBookingDate() {
    const groupBookingDate = await this.bookingsEntity
      .createQueryBuilder('booking')
      .select('booking.booking_date', 'date')
      .addSelect('COUNT(booking.id)', 'total_bookings')
      .groupBy('booking.booking_date')
      .orderBy('booking_date', 'DESC')
      .getRawMany();

    return groupBookingDate;
  }

  // 9. Report Booking
  async reportBooking() {
    const reportBooking = await this.bookingsEntity
      .createQueryBuilder('booking')
      .select(['services.name', 'services.price', 'services.service_image'])
      .addSelect('COUNT(service_id)', 'book_count')
      .innerJoin('booking.services', 'services')
      .groupBy('services.id')
      .orderBy('book_count', 'DESC')
      .getRawMany();
    return reportBooking;
  }
}
