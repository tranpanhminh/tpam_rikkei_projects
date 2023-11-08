import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class ResetPasswordDTO {
  @IsNotEmpty({ message: 'New Password should not be empty' })
  @IsString({ message: 'New Password should be string' })
  @MinLength(8, { message: 'New Password must be at least 8 characters' })
  password?: string;
}
