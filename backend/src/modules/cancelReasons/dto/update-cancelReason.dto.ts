import { IsString } from 'class-validator';
export class UpdateCancelReasonDTO {
  @IsString({ message: 'Cancel Reason should be string' })
  name: string;
}
