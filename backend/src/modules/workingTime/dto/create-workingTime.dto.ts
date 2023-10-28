import { IsNotEmpty, IsString } from 'class-validator';
export class CreateWorkingTimeDTO {
  @IsNotEmpty({ message: 'Morning Time should not be empty' })
  @IsString({ message: 'Morning Time should be string' })
  morning_time: string;

  @IsNotEmpty({ message: 'Afternoon Time should not be empty' })
  @IsString({ message: 'Afternoon Time should be string' })
  afternoon_time: string;
}
