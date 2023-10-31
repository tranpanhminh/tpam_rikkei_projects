import {
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import { OrdersEntity } from './database/entity/orders.entity';
// import { CheckOrderExist } from 'src/interceptors/checkOrderExist';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/orders`)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // 1. Get All
  @Get()
  async getAllOrders() {
    const result = await this.ordersService.getAllOrders();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  // @UseInterceptors(CheckOrderExist)
  async getDetailOrder(
    @Param('id') id: number,
  ): Promise<OrdersEntity | unknown> {
    const result: OrdersEntity | unknown =
      await this.ordersService.getDetailOrder(id);
    return result;
  }

  // 3. Add
  // @Post("/add")
  // async addOrder(
  //   @Body() body: CreateOrderDTO
  // ): Promise<OrdersEntity | unknown> {
  //   const result: string | unknown = await this.ordersService.addOrder(body);
  //   return result;
  // }

  // 4. Delete
  // @Delete("/delete/:id")
  // @UseInterceptors(CheckOrderExist)
  // async deleteOrder(@Param("id") id: number): Promise<OrdersEntity | unknown> {
  //   const result: string | unknown = await this.ordersService.deleteOrder(id);
  //   return result;
  // }

  // 5. Update
  // @Patch("update/:id")
  // @UseInterceptors(CheckOrderExist)
  // async updateOrder(
  //   @Param("id") id: number,
  //   @Body() body: UpdateOrderDTO
  // ): Promise<OrdersEntity | unknown> {
  //   const result = await this.ordersService.updateOrder(id, body);
  //   return result;
  // }
}
