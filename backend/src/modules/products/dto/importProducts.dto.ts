import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { IsStringHigherThanZero } from 'src/pipes/custom-validator';

export class ImportProductsDTO {
  @IsNotEmpty({ message: 'Product Name should not be empty' })
  @IsString({ message: 'Product Name should be string' })
  name: string;
  @IsNotEmpty({ message: 'Product Description should not be empty' })
  @IsString({ message: 'Product Description should be string' })
  description: string;
  @IsNotEmpty({ message: 'Price should not be empty' })
  @IsNumberString({}, { message: 'Price should be number' })
  @IsStringHigherThanZero()
  price: number;
  @IsNotEmpty({ message: 'Quantity Stock should not be empty' })
  @IsNumberString({}, { message: 'Quantity Stock should be number' })
  @IsStringHigherThanZero({ message: 'Quantity Stock should not be < 0' })
  quantity_stock: number;
  @IsNumberString({}, { message: 'Vendor should be number' })
  @IsNotEmpty({ message: 'Vendor should not be empty' })
  vendor_id: number;
  @IsString()
  thumbnail_url: string;
  @IsString()
  image_url1: string;
  @IsString()
  image_url2: string;
  @IsString()
  image_url3: string;
  @IsString()
  image_url4: string;
  // name: string;
  // quantity_stock: number;
  // price: number;
  // description: string;
  // thumbnail_url: string;
  // vendor_id: number;
  // image_url1: string;
  // image_url2: string;
  // image_url3: string;
  // image_url4: string;
}
