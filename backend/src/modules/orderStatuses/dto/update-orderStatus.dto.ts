import { IsString } from "class-validator";
export class UpdateOrderStatusDTO {
  @IsString({ message: "Order Status should be string" })
  name: string;
}
