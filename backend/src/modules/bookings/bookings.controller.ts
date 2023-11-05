import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { ConfigModule } from '@nestjs/config';
import { BookingsEntity } from './database/entity/bookings.entity';
import { CreateBookingDTO } from './dto/createBooking.dto';
import { UpdateBookingDTO } from './dto/updateBooking.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/bookings`)
@UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
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

  // 3. Add
  @Post('/add/users/:userId/services/:id')
  async addBooking(
    @Param() params: { userId: number; id: number },
    @Body() body: CreateBookingDTO,
  ): Promise<BookingsEntity | unknown> {
    const result: string | unknown = await this.bookingsService.addBooking(
      params.userId,
      params.id,
      body,
    );
    return result;
  }

  // 4. Filter Booking By User ID
  @Get('/filter/users/:userId')
  async filterBookingByUserId(@Param('userId') userId: number) {
    const result = await this.bookingsService.filterBookingByUserId(userId);
    return result;
  }

  // 5. Cancel Booking
  @Patch('/cancel-booking/:id')
  async cancelBooking(
    @Param('id') id: number,
  ): Promise<BookingsEntity | unknown> {
    const result: string | unknown =
      await this.bookingsService.cancelBooking(id);
    return result;
  }

  // 6. Update Booknig For Admin
  @Patch('update/:id')
  async updateBooking(
    @Param('id') id: number,
    @Body() body: UpdateBookingDTO,
  ): Promise<BookingsEntity | unknown> {
    const result = await this.bookingsService.updateBooking(id, body);
    return result;
  }

  // 7. Group Booking Date
  @Get('/group')
  async groupBookingDate() {
    const result = await this.bookingsService.groupBookingDate();
    return result;
  }

  // 8. Report Booking
  @Get('/report')
  async reportBooking() {
    const result = await this.bookingsService.reportBooking();
    return result;
  }

  // 9. Filter Booking By Date
  @Get('/filter/date/:date')
  async filterDetailBookingDate(@Param('date') date: string) {
    const result = await this.bookingsService.filterDetailBookingDate(date);
    return result;
  }
}
