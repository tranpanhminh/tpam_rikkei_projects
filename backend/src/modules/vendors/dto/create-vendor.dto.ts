import { IsNotEmpty } from 'class-validator';
export class CreateVendorDTO {
  @IsNotEmpty()
  name: string;
}
