import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
export class CreateServiceDTO {
  @IsNotEmpty({ message: "Service Name should not be empty" })
  @IsString({ message: "Service Name should be string" })
  name: string;

  @IsNotEmpty({ message: "Service Code should not be empty" })
  @IsString({ message: "Service Code should be string" })
  code: string;

  @IsNotEmpty({ message: "Discount Rate should not be empty" })
  @IsPositive({ message: "Discount Rate should be a positive number" })
  @IsNumber({}, { message: "Discount Rate should be a number" })
  discount_rate: number;

  @IsNotEmpty({ message: "Min Bill should not be empty" })
  @IsPositive({ message: "Min Bill should be a positive number" })
  @IsNumber({}, { message: "Min Bill should be a number" })
  min_bill: number;
}
