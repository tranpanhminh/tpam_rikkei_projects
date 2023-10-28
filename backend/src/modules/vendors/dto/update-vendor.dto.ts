import { IsString } from 'class-validator';
export class UpdateVendorDTO {
  @IsString({ message: 'Vendor Name should be string' })
  name: string;
}
