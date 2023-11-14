import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  IsFile,
  MaxFileSize,
  HasMimeType,
  MemoryStoredFile,
} from 'nestjs-form-data';
export class CreatePostDTO {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @MaxLength(180, { message: 'Title must < 180 Characters' })
  title: string;

  @IsNotEmpty({ message: 'Content should not be empty' })
  content: string;

  @IsFile()
  @MaxFileSize(1000000, { message: 'File size must be < 1 Mb' })
  @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
  thumbnail_url: MemoryStoredFile;

  @IsNotEmpty({ message: 'Author Name should not be empty' })
  @MaxLength(20, { message: 'Author must < 20 Characters' })
  author: string;

  @IsNotEmpty({ message: 'Status should not be empty' })
  status_id: number;
}
