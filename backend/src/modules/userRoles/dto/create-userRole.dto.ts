import { IsNotEmpty } from 'class-validator';
export class CreateUserRoleDTO {
  @IsNotEmpty()
  name: string;
}
