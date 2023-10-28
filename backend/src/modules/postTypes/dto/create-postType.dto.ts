import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePostStatusDTO {
  @IsNotEmpty({ message: 'Post Type Name should not be empty' })
  @IsString({ message: 'Post Type Name should be string' })
  name: string;
}
