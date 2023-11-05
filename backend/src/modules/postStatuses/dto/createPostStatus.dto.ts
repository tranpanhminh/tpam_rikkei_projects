import { IsNotEmpty, IsString } from 'class-validator';
export class CreatePostStatusDTO {
  @IsNotEmpty({ message: 'Post Status Name should not be empty' })
  @IsString({ message: 'Post Status Name should be string' })
  name: string;
}
