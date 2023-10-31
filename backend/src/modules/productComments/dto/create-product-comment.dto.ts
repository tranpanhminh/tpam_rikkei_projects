import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
export class CreateProductCommentDTO {
  @IsNotEmpty({ message: 'ProductComment Name should not be empty' })
  @IsString({ message: 'ProductComment Name should be string' })
  comment: string;

  @IsNotEmpty({ message: 'Rating should not be empty' })
  @IsPositive({ message: 'Rating should be a positive number' })
  @IsNumber({}, { message: 'Rating should be a number' })
  @Min(0)
  @Max(5)
  rating: number;
}
