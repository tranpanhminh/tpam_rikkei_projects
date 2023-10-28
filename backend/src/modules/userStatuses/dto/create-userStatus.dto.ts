import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserStatusDTO {
  @IsNotEmpty({ message: 'User Status Name should not be empty' })
  @IsString({ message: 'User Status Name should be string' })
  name: string;
}
