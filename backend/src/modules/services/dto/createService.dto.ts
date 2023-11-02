import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { IsStringHigherThanZero } from 'src/pipes/custom-validator';
export class CreateServiceDTO {
  @IsNotEmpty({ message: 'Service Name should not be empty' })
  @IsString({ message: 'Service Name should be string' })
  name: string;

  @IsNotEmpty({ message: 'Service Name should not be empty' })
  @IsString({ message: 'Service Description should be string' })
  description: string;

  @IsNotEmpty({ message: 'Price should not be empty' })
  @IsNumberString({}, { message: 'Price should be number' })
  @IsStringHigherThanZero()
  price: number;

  @IsFile()
  @MaxFileSize(1000000, { message: 'File size must be < 1 Mb' })
  @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
  service_image: MemoryStoredFile;

  @IsNumberString({}, { message: 'Working Time should be number' })
  @IsNotEmpty({ message: 'Working Time should not be empty' })
  working_time_id: number;

  post_type_id: number;
}
