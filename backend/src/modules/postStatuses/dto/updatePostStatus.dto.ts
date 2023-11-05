import { IsString } from 'class-validator';
export class UpdatePostStatusDTO {
  @IsString({ message: 'Post Status Name should be string' })
  name: string;
}
