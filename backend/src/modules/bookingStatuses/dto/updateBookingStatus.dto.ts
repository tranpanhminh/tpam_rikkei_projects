/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
export class UpdateBookingStatusDTO {
  @IsString({ message: "Booking Status should be string" })
  name: string;
}
