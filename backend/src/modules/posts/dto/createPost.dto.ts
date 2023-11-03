import { IsNotEmpty } from 'class-validator';
import {
  IsFile,
  MaxFileSize,
  HasMimeType,
  MemoryStoredFile,
} from 'nestjs-form-data';
export class CreatePostDTO {
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @IsNotEmpty({ message: 'Content should not be empty' })
  content: string;

  @IsFile()
  @MaxFileSize(1000000, { message: 'File size must be < 1 Mb' })
  @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
  thumbnail_url: MemoryStoredFile;

  @IsNotEmpty({ message: 'Author Name should not be empty' })
  author: string;

  @IsNotEmpty({ message: 'Content should not be empty' })
  status_id: number;
}
