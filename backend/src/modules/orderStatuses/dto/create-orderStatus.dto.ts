import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserStatusDTO {
  @IsNotEmpty({ message: 'Order Status should not be empty' })
  @IsString({ message: 'Order Status should be string' })
  name: string;
}
