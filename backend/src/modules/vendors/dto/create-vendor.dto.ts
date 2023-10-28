import { IsNotEmpty, IsString } from 'class-validator';
export class CreateVendorDTO {
  @IsNotEmpty({ message: 'Vendor Name should not be empty' })
  @IsString({ message: 'Vendor Name should be string' })
  name: string;
}
