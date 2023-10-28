import { IsNotEmpty } from 'class-validator';
export class CreateVendorDTO {
  @IsNotEmpty({ message: 'Vendor Name should not be empty' })
  name: string;
}
