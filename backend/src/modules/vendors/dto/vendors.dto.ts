/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from 'class-validator';
export class VendorsDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
