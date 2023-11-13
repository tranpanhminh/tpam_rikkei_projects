import { IsOptional, IsString, MaxLength } from 'class-validator';
import { NotIncludeNumberAndSpecialCharacter } from 'src/pipes/custom-validator';
export class UpdateUserDTO {
  @IsOptional()
  @NotIncludeNumberAndSpecialCharacter({
    message: 'User Name should not include number and special character',
  })
  @IsString({ message: 'User Name should be string' })
  @MaxLength(30, { message: 'Full Name must < 30 Characters' })
  full_name?: string;
}
