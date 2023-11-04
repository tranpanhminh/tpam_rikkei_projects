import { IsOptional, IsString } from 'class-validator';
export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: 'User Name should be string' })
  full_name?: string;
}
