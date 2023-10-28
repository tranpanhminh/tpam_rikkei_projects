import { IsString } from 'class-validator';
export class UpdatePostStatusDTO {
  @IsString({ message: 'Post Type Name should be string' })
  name: string;
}
