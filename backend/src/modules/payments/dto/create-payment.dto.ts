import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { IsExpiryDate, IsCVV } from 'src/pipes/custom-validator';

export class CreatePaymentDTO {
  @IsNotEmpty({ message: 'Card Holder Name should not be empty' })
  @IsString({ message: 'Card Holder Name should be string' })
  cardholder_name: string;

  @IsNotEmpty({ message: 'Card Number should not be empty' })
  @IsCreditCard({ message: 'Card Number is not valid' })
  card_number: string;

  @IsNotEmpty({ message: 'Expiry Date should not be empty' })
  @IsExpiryDate({ message: 'Invalid expiry date format (MM/YY)' })
  expiry_date: string;

  @IsNotEmpty({ message: 'CVV should not be empty' })
  @IsCVV({ message: 'Invalid CVV Format' })
  cvv: number;

  @IsNotEmpty({ message: 'Balance should not be empty' })
  @IsNumber({}, { message: 'Balance should be number' })
  @Min(0, { message: 'Balance must not be less than 0' })
  balance: number;
}
