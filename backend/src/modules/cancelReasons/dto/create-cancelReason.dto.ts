/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class CreateCancelReasonDTO {
  @IsNotEmpty()
  name: string;
}
