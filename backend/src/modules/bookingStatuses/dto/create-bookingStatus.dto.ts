/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserStatusDTO {
  @IsNotEmpty({ message: 'Booking Status should not be empty' })
  @IsString({ message: 'Booking Status should be string' })
  name: string;
}
