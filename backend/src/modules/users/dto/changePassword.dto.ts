import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsNotTheSame } from 'src/pipes/custom-validator';
export class ChangePasswordDTO {
  old_password: string;

  @IsNotEmpty({ message: 'New Password should not be empty' })
  @IsString({ message: 'New Password should be string' })
  @MinLength(8, { message: 'New Password must be at least 8 characters' })
  @IsNotTheSame('old_password', {
    message: 'New Password should not be the same Old Password',
  })
  new_password: string;
}
