import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  NotIncludeAdminText,
  NotIncludeNumberAndSpecialCharacter,
} from 'src/pipes/custom-validator';
import { Column } from 'typeorm';
export class CreateAdminDTO {
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsString({ message: 'Email should be string' })
  @IsEmail({}, { message: 'Invalid Email' })
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

  @Column()
  image_avatar: string;

  @Column()
  role_id: number;

  @Column()
  status_id: number;
}
