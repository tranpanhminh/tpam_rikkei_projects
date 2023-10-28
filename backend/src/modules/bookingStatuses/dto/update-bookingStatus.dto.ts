/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
export class UpdateUserStatusDTO {
  @IsString({ message: 'Booking Status should be string' })
  name: string;
}
