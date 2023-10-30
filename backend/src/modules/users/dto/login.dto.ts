import { IsEmail, IsNotEmpty } from 'class-validator';
import {} from 'src/pipes/custom-validator';
export class LoginDTO {
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
