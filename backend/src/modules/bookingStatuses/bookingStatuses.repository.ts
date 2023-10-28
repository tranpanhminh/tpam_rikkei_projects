import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookingStatusesEntity } from "./database/entity/bookingStatuses.entity";
import { CreateBookingStatusDTO } from "./dto/create-bookingStatus.dto";
import { UpdateBookingStatusDTO } from "./dto/update-bookingStatus.dto";

@Injectable()
export class BookingStatusesRepository {
  constructor(
    @InjectRepository(BookingStatusesEntity)
    private bookingStatusesEntity: Repository<BookingStatusesEntity>
  ) {}

  // 1. Get All
  async getAllBookingStatuses() {
    return await this.bookingStatusesEntity.find();
  }

  // 2. Get Detail
  async getDetailBookingStatus(id: number): Promise<BookingStatusesEntity> {
    const detailBookingStatus = await this.bookingStatusesEntity.findOneById(
      id
    );
    return detailBookingStatus;
  }

  // 3. Add
  async addBookingStatus(
    newBookingStatus: CreateBookingStatusDTO
  ): Promise<BookingStatusesEntity | unknown> {
    return await this.bookingStatusesEntity.save(newBookingStatus);
  }

  // 4. Add
  async deleteBookingStatus(
    id: number
  ): Promise<BookingStatusesEntity | unknown> {
    return await this.bookingStatusesEntity.delete(id);
  }

  // 5. Update
  async updateBookingStatus(
    id: number,
    updateBookingStatus: UpdateBookingStatusDTO
  ): Promise<BookingStatusesEntity | unknown> {
    return await this.bookingStatusesEntity.update(id, updateBookingStatus);
  }
}
