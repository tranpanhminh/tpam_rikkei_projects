import { IsNumberString, IsString } from 'class-validator';
import { IsStringHigherThanZero } from 'src/pipes/custom-validator';
export class UpdateProductDTO {
  @IsString({ message: 'Product Name should be string' })
  name: string;

  @IsString({ message: 'Description should be string' })
  description: string;

  @IsStringHigherThanZero({ message: 'Price should not be < 0' })
  price: number;

  @IsStringHigherThanZero({ message: 'Quantity Stock should not be < 0' })
  quantity_stock: number;

  vendor_id?: number;
}