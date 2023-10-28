import { IsNumber, IsPositive, IsString } from 'class-validator';
export class UpdateCouponDTO {
  @IsString({ message: 'Coupon Name should be string' })
  name: string;

  @IsString({ message: 'Coupon Code should be string' })
  code: string;

  @IsNumber({}, { message: 'Discount Rate should be a number' })
  @IsPositive({ message: 'Discount Rate should be a positive number' })
  discount_rate: number;

  @IsNumber({}, { message: 'Min Bill should be a number' })
  @IsPositive({ message: 'Min Bill should be a positive number' })
  min_bill: number;
}
