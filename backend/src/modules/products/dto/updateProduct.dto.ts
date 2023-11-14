import { IsString, MaxLength } from 'class-validator';
import {
  IsOnlyNumber,
  IsStringHigherThanZero,
} from 'src/pipes/custom-validator';
export class UpdateProductDTO {
  @IsString({ message: 'Product Name should be string' })
  @MaxLength(180, { message: 'Product Name must < 180 Characters' })
  name: string;

  @IsString({ message: 'Description should be string' })
  description: string;

  @IsStringHigherThanZero({ message: 'Price should not be < 0' })
  @IsOnlyNumber({ message: 'Price is only number' })
  price: number;

  @IsStringHigherThanZero({ message: 'Quantity Stock should not be < 0' })
  @IsOnlyNumber({ message: 'Stock is only number' })
  quantity_stock: number;

  vendor_id?: number;
}
