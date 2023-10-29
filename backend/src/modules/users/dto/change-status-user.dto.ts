import { IsNumber } from 'class-validator';
export class UpdateStatusUserDTO {
  @IsNumber({}, { message: 'Status ID should be number' })
  status_id: number;
}
