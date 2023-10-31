import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
export class CreateCartDTO {
  user_id: number;
  product_id: number;

  @IsNotEmpty({ message: 'Discount Rate should not be empty' })
  @IsPositive({ message: 'Discount Rate should be a positive number' })
  @IsNumber({}, { message: 'Discount Rate should be a number' })
  quantity: number;
}
