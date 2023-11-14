import { IsOptional, IsString, MaxLength } from 'class-validator';
import {
  // HasMimeType,
  // IsFile,
  // MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { IsStringHigherThanZero } from 'src/pipes/custom-validator';
export class UpdateServiceDTO {
  @IsString({ message: 'Service Name should be string' })
  @MaxLength(20, { message: 'Title must < 20 Characters' })
  name: string;

  @IsString({ message: 'Service Description should be string' })
  description: string;

  @IsStringHigherThanZero({ message: 'Price should not be < 0' })
  price: number;

  // @IsEmpty()
  @IsOptional()
  // @IsFile()
  // @MaxFileSize(1000000, { message: 'File size must be < 1 Mb' })
  // @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
  service_image?: MemoryStoredFile;

  @IsOptional({ message: 'Invalid Working Time' })
  working_time_id: number;
}
