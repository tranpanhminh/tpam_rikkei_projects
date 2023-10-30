import { IsNotEmpty, IsNumberString } from 'class-validator';
import { IsFiles, MemoryStoredFile } from 'nestjs-form-data';
import {
  CheckEachFileSize,
  FilesLengthMustBeFour,
  IsImage,
  IsStringHigherThanZero,
} from 'src/pipes/custom-validator';
export class CreateProductDTO {
  @IsNotEmpty({ message: 'Product Name should not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Product Name should not be empty' })
  description: string;

  @IsNotEmpty({ message: 'Price should not be empty' })
  @IsNumberString({}, { message: 'Price should be number' })
  @IsStringHigherThanZero()
  price: number;

  @IsNotEmpty({ message: 'Quantity Stock should not be empty' })
  @IsNumberString({}, { message: 'Quantity Stock should be number' })
  @IsStringHigherThanZero({ message: 'Quantity Stock should not be < 0' })
  quantity_stock: number;

  @IsNotEmpty({ message: 'Product Images should not be empty' })
  @IsFiles()
  @CheckEachFileSize({ message: 'File size must be under 1 MB.' })
  @IsImage({ message: 'Only accept jpeg, jpg, png' })
  @FilesLengthMustBeFour({ message: 'Product Images should have 4 Images' })
  image_url: MemoryStoredFile;

  @IsNotEmpty({ message: 'Vendor should not be empty' })
  vendor_id: number;

  post_type_id: number;
}
