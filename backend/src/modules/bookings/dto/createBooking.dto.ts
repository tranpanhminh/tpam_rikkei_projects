import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class CreateBookingDTO {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be string' })
  name: string;

  @IsNotEmpty({ message: 'Booking Name should not be empty' })
  @IsPhoneNumber('US', {
    message: 'Invalid US Phone Number (Example: 112345678900)',
  })
  phone: string;

  @IsNotEmpty({ message: 'Booking Date should not be empty' })
  @IsString({ message: 'Booking Date should be string' })
  booking_date: string;

  @IsNotEmpty({ message: 'Calendar should not be empty' })
  @IsString({ message: 'Calendar should be string' })
  calendar: string;
}
