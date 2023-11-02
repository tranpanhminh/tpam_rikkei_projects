import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BookingsRepository } from "./bookings.repository";
import { BookingsEntity } from "./database/entity/bookings.entity";
import { CreateBookingDTO } from "./dto/create-booking.dto";
import { UpdateBookingDTO } from "./dto/update-booking.dto";

@Injectable()
export class BookingsService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

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

  // // 3. Add
  // async addBooking(body: CreateBookingDTO): Promise<BookingsEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const newBooking = {
  //     name: name,
  //     code: code,
  //     discount_rate: discount_rate,
  //     min_bill: min_bill,
  //   };
  //   await this.bookingsRepository.addBooking(newBooking);
  //   return new HttpException("Booking Added", HttpStatus.OK);
  // }

  // // 4. Delete
  // async deleteBooking(id: number): Promise<BookingsEntity | unknown> {
  //   const checkBooking = await this.bookingsRepository.getDetailBooking(id);
  //   if (checkBooking) {
  //     await this.bookingsRepository.deleteBooking(id);
  //     return new HttpException("Booking Deleted", HttpStatus.OK);
  //   }
  // }

  // // 5. Update
  // async updateBooking(
  //   id: number,
  //   body: UpdateBookingDTO
  // ): Promise<BookingsEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const checkBooking: BookingsEntity =
  //     await this.bookingsRepository.getDetailBooking(id);
  //   if (checkBooking) {
  //     const updateBooking = {
  //       name: !name ? checkBooking.name : name,
  //       code: !code ? checkBooking.code : code,
  //       discount_rate: !discount_rate
  //         ? checkBooking.discount_rate
  //         : discount_rate,
  //       min_bill: !min_bill ? checkBooking.min_bill : min_bill,
  //     };
  //     await this.bookingsRepository.updateBooking(id, updateBooking);
  //     return new HttpException("Booking Updated", HttpStatus.OK);
  //   }
  // }
}
