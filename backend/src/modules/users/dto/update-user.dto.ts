import { IsString } from 'class-validator';
export class UpdateUserDTO {
  @IsString({ message: 'User Name should be string' })
  full_name: string;
}
