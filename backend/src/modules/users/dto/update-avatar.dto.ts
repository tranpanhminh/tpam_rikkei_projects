import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class UpdateAvatarDTO {
  @IsFile()
  @MaxFileSize(1000000, { message: 'File size must be < 1 Mb' })
  @HasMimeType(['image/jpeg', 'image/png'])
  image_avatar: MemoryStoredFile;
}
