import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCancelReasonDTO {
  @IsNotEmpty({ message: 'Cancel Reason should not be empty' })
  @IsString({ message: 'Cancel Reason should be string' })
  name: string;
}
