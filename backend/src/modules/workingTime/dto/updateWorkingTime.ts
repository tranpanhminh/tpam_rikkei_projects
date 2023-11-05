import { IsString } from 'class-validator';
export class UpdateWorkingTimeDTO {
  @IsString({ message: 'Morning Time should be string' })
  morning_time: string;

  @IsString({ message: 'Afternoon Time should be string' })
  afternoon_time: string;
}
