/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
export class CreateCouponDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  discount_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  min_bill: number;
}
