import { IsNumber, IsPositive, IsString } from 'class-validator';
export class UpdateCouponDTO {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumber()
  @IsPositive()
  discount_rate: number;

  @IsNumber()
  @IsPositive()
  min_bill: number;
}
