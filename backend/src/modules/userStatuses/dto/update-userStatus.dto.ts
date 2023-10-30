import { IsString } from 'class-validator';
export class UpdateUserStatusDTO {
  @IsString({ message: 'User Status Name should be string' })
  name: string;
}