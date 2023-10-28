import {
  IsCreditCard,
  IsCurrency,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { IsCVV, IsExpiryDate } from 'src/pipes/custom-validator';
export class UpdatePaymentDTO {
  @IsString({ message: 'Card Holder Name should be string' })
  cardholder_name: string;

  @IsCreditCard({ message: 'Card Number is not valid' })
  card_number: string;

  @IsExpiryDate({ message: 'Invalid expiry date format (MM/YY)' })
  expiry_date: string;

  @IsCVV({ message: 'Invalid CVV Format' })
  cvv: number;

  @IsNumber({}, { message: 'Balance should be number' })
  @Min(0, { message: 'Balance must not be less than 0' })
  balance: number;
}
