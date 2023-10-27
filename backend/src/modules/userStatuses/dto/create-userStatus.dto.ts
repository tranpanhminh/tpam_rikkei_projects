/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class CreateUserStatusDTO {
  @IsNotEmpty()
  name: string;
}
