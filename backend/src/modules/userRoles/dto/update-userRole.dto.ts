import { IsString } from 'class-validator';
export class UpdateUserRoleDTO {
  @IsString({ message: 'User Role Name should be string' })
  name: string;
}
