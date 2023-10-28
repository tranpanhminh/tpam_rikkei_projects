import { IsString } from 'class-validator';
export class UpdateUserStatusDTO {
  @IsString({ message: 'Order Status should be string' })
  name: string;
}
