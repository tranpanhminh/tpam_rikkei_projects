import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import {
  CheckPasswordAndRepassword,
  NotIncludeAdminText,
  NotIncludeNumberAndSpecialCharacter,
} from 'src/pipes/custom-validator';
export class UserRegisterDTO {
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsString({ message: 'Email should be string' })
  @IsEmail({}, { message: 'Email should be string' })
  email: string;

  @IsNotEmpty({ message: 'Full Name should not be empty' })
  @IsString({ message: 'Full Name should be string' })
  @NotIncludeNumberAndSpecialCharacter({
    message: 'Full Name cannot contain special characters or numbers',
  })
  @NotIncludeAdminText({ message: 'Full Name must not include Admin' })
  full_name: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString({ message: 'Password should be string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @Validate(CheckPasswordAndRepassword, ['password'], {
    message: 'Repassword must be the same Password',
  })
  re_password?: string;

  image_avatar: string;
  role_id: number;
  status_id: number;
}
