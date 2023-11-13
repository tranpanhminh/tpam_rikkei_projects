import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class ResetPasswordDTO {
  @IsNotEmpty({ message: 'New Password should not be empty' })
  @IsString({ message: 'New Password should be string' })
  @MinLength(8, { message: 'New Password must be at least 8 characters' })
  @MaxLength(20, { message: 'Password must be < 20 characters' })
  password?: string;
}
