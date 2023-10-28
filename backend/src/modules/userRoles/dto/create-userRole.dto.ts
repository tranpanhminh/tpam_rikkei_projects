import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserRoleDTO {
  @IsNotEmpty({ message: 'User Role Name should not be empty' })
  @IsString({ message: 'User Role Name should be string' })
  name: string;
}
