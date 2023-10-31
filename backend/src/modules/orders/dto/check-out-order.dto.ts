import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class CheckOutOrderDTO {
  @IsNotEmpty({ message: 'Customer Name should not be empty' })
  @IsString({ message: 'Customer Name should be string' })
  customer_name: string;

  @IsNotEmpty({ message: 'Addres should not be empty' })
  @IsString({ message: 'Addres should be string' })
  address: string;

  @IsPhoneNumber('US', {
    message: 'Invalid US Phone Number (Example: 112345678900)',
  })
  phone: string;

  // @IsNotEmpty({ message: 'Phone should not be empty' })
  // @IsString({ message: 'Phone should be string' })
  // discount_rate: number;

  // @IsNotEmpty({ message: 'Phone should not be empty' })
  // @IsString({ message: 'Phone should be string' })
  // discounted: number;

  // @IsNotEmpty({ message: 'Phone should not be empty' })
  // @IsString({ message: 'Phone should be string' })
  // bill: number;

  // @IsNotEmpty({ message: 'Phone should not be empty' })
  // @IsString({ message: 'Phone should be string' })
  // total_bill: number;

  // cancellation_reason: string;
  // cancel_reason_id: number;
  // status_id: number;
  // email_paypal: string;
}
