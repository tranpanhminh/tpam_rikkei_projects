import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
export class AddToCartDTO {
  @IsNotEmpty({ message: 'Quantity should not be empty' })
  @IsPositive({ message: 'Quantity should be a positive number' })
  @IsNumber({}, { message: 'Quantity should be a number' })
  quantity: number;
}
