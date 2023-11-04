import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingStatusesService } from './bookingStatuses.service';
import { CreateBookingStatusDTO } from './dto/create-bookingStatus.dto';
import { UpdateBookingStatusDTO } from './dto/update-bookingStatus.dto';
import { ConfigModule } from '@nestjs/config';
import { BookingStatusesEntity } from './database/entity/bookingStatuses.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/booking-statuses`)
export class BookingStatusesController {
  constructor(
    private readonly bookingStatusesService: BookingStatusesService,
  ) {}

  // 1. Get All
  @Get()
  async getAllBookingStatuses() {
    const result = await this.bookingStatusesService.getAllBookingStatuses();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailBookingStatus(
    @Param('id') id: number,
  ): Promise<BookingStatusesEntity | unknown> {
    const result: BookingStatusesEntity | unknown =
      await this.bookingStatusesService.getDetailBookingStatus(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addBookingStatus(
    @Body() body: CreateBookingStatusDTO,
  ): Promise<BookingStatusesEntity | unknown> {
    const result: string | unknown =
      await this.bookingStatusesService.addBookingStatus(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  async deleteBookingStatus(
    @Param('id') id: number,
  ): Promise<BookingStatusesEntity | unknown> {
    const result: string | unknown =
      await this.bookingStatusesService.deleteBookingStatus(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  async updateBookingStatus(
    @Param('id') id: number,
    @Body() body: UpdateBookingStatusDTO,
  ): Promise<BookingStatusesEntity | unknown> {
    const result = await this.bookingStatusesService.updateBookingStatus(
      id,
      body,
    );
    return result;
  }
}
