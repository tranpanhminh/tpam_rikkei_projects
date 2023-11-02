import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { ConfigModule } from '@nestjs/config';
import { BookingsEntity } from './database/entity/bookings.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/bookings`)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // 1. Get All
  @Get()
  async getAllBookings() {
    const result = await this.bookingsService.getAllBookings();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailBooking(
    @Param('id') id: number,
  ): Promise<BookingsEntity | unknown> {
    const result: BookingsEntity | unknown =
      await this.bookingsService.getDetailBooking(id);
    return result;
  }

  // // 3. Add
  // @Post("/add")
  // async addBooking(
  //   @Body() body: CreateBookingDTO
  // ): Promise<BookingsEntity | unknown> {
  //   const result: string | unknown = await this.bookingsService.addBooking(
  //     body
  //   );
  //   return result;
  // }

  // // 4. Delete
  // @Delete("/delete/:id")
  // @UseInterceptors(CheckBookingExist)
  // async deleteBooking(
  //   @Param("id") id: number
  // ): Promise<BookingsEntity | unknown> {
  //   const result: string | unknown = await this.bookingsService.deleteBooking(
  //     id
  //   );
  //   return result;
  // }

  // // 5. Update
  // @Patch("update/:id")
  // @UseInterceptors(CheckBookingExist)
  // async updateBooking(
  //   @Param("id") id: number,
  //   @Body() body: UpdateBookingDTO
  // ): Promise<BookingsEntity | unknown> {
  //   const result = await this.bookingsService.updateBooking(id, body);
  //   return result;
  // }
}
