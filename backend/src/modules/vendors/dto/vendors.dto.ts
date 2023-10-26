/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class VendorsDTO {
  @IsNotEmpty()
  name: string;
}
