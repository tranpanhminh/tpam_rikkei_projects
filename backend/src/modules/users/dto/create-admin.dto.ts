import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';
export class CreateAdminDTO {
  @IsString({ message: 'Email should be string' })
  @IsEmail({}, { message: 'Email should be string' })
  email: string;

  @IsString({ message: 'Full Name should be string' })
  full_name: string;

  @IsString({ message: 'Full Name should be string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @IsString({ message: 'Full Name should be string' })
  image_avatar: string;

  @IsNumber({}, { message: 'Role ID should be string' })
  role_id: number;

  @IsNumber({}, { message: 'Status ID should be number' })
  status_id: number;
}
