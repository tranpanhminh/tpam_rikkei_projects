import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { CartsService } from "./carts.service";
import { CreateCartDTO } from "./dto/create-cart.dto";
import { UpdateCartDTO } from "./dto/update-cart.dto";
import { ConfigModule } from "@nestjs/config";
import { CartsEntity } from "./database/entity/carts.entity";

ConfigModule.forRoot({
  envFilePath: ".env",
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/carts`)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // 1. Get All
  @Get()
  async getAllCarts() {
    const result = await this.cartsService.getAllCarts();
    return result;
  }

  // 2. Get Detail
  @Get("/detail/:id")
  // @UseInterceptors(CheckCartExist)
  async getDetailCart(@Param("id") id: number): Promise<CartsEntity | unknown> {
    const result: CartsEntity | unknown = await this.cartsService.getDetailCart(
      id
    );
    return result;
  }

  // // 3. Add
  // @Post("/add")
  // async addCart(@Body() body: CreateCartDTO): Promise<CartsEntity | unknown> {
  //   const result: string | unknown = await this.cartsService.addCart(body);
  //   return result;
  // }

  // // 4. Delete
  // @Delete("/delete/:id")
  // @UseInterceptors(CheckCartExist)
  // async deleteCart(@Param("id") id: number): Promise<CartsEntity | unknown> {
  //   const result: string | unknown = await this.cartsService.deleteCart(id);
  //   return result;
  // }

  // // 5. Update
  // @Patch("update/:id")
  // @UseInterceptors(CheckCartExist)
  // async updateCart(
  //   @Param("id") id: number,
  //   @Body() body: UpdateCartDTO
  // ): Promise<CartsEntity | unknown> {
  //   const result = await this.cartsService.updateCart(id, body);
  //   return result;
  // }
}
