import { IsNotEmpty } from "class-validator";
export class CreateProductDTO {
  @IsNotEmpty({ message: "Product Name should not be empty" })
  name: string;
}
