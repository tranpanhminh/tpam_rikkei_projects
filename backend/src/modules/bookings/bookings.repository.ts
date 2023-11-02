import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookingsEntity } from "./database/entity/bookings.entity";
import { CreateBookingDTO } from "./dto/create-booking.dto";
import { UpdateBookingDTO } from "./dto/update-booking.dto";

@Injectable()
export class BookingsRepository {
  constructor(
    @InjectRepository(BookingsEntity)
    public bookingsEntity: Repository<BookingsEntity>
  ) {}

  // 1. Get All
  async getAllBookings() {
    return await this.bookingsEntity.find();
  }

  // 2. Get Detail
  async getDetailBooking(id: number): Promise<BookingsEntity> {
    const detailBooking = await this.bookingsEntity.findOneById(id);
    return detailBooking;
  }

  // // 3. Add
  // async addBooking(
  //   newBooking: CreateBookingDTO
  // ): Promise<BookingsEntity | unknown> {
  //   return await this.bookingsEntity.save(newBooking);
  // }

  // // 4. Add
  // async deleteBooking(id: number): Promise<BookingsEntity | unknown> {
  //   return await this.bookingsEntity.delete(id);
  // }

  // // 5. Update
  // async updateBooking(
  //   id: number,
  //   updateBooking: UpdateBookingDTO
  // ): Promise<BookingsEntity | unknown> {
  //   return await this.bookingsEntity.update(id, updateBooking);
  // }

  // // 6. Check Bill To Apply Booking
  // async checkBillToApplyBooking(bill: number): Promise<unknown> {
  //   const listCounpons = this.bookingsEntity
  //     .createQueryBuilder("booking")
  //     .select(["*"])
  //     .where("booking.min_bill <= :bill", { bill })
  //     .orderBy("booking.min_bill", "DESC")
  //     .limit(1);
  //   const result = await listCounpons.getRawOne();
  //   return result;
  // }
}
