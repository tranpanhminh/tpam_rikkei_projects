import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { MemoryStoredFile } from 'nestjs-form-data';
export class UpdatePostDTO {
  @IsString({ message: 'Title should be string' })
  @MaxLength(180, { message: 'Title must < 180 Characters' })
  title: string;

  @IsString({ message: 'Content should be string' })
  content: string;

  @IsOptional()
  // @IsFile()
  // @MaxFileSize(1000000, { message: 'File size must be < 1 Mb' })
  // @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
  thumbnail_url?: MemoryStoredFile;

  @IsNotEmpty({ message: 'Author Name should not be empty' })
  @MaxLength(20, { message: 'Author must < 20 Characters' })
  author: string;

  @IsNumberString({}, { message: 'Status should be number' })
  status_id: number;
}
