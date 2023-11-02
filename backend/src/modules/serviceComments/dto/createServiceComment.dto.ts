import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CheckRatingMinMax } from 'src/pipes/custom-validator';
export class CreateServiceCommentDTO {
  @IsNotEmpty({ message: 'Service Comment Name should not be empty' })
  @IsString({ message: 'Service Comment Name should be string' })
  comment: string;

  @CheckRatingMinMax({ message: 'Rating should be between 0 and 5' })
  @IsNumber({}, { message: 'Rating should be number' })
  rating: number;
}
