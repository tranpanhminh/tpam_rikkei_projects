import { IsNotEmpty } from 'class-validator';
export class CreatePostStatusDTO {
  @IsNotEmpty()
  name: string;
}
