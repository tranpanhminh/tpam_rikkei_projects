import { Controller, Get, Param } from '@nestjs/common';
import { OrderItemsService } from './orderItems.service';
import { ConfigModule } from '@nestjs/config';
import { OrderItemsEntity } from './database/entity/orderItems.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/order-items`)
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  // 1. Get All
  @Get()
  async getAllOrderItems() {
    const result = await this.orderItemsService.getAllOrderItems();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailOrderItem(
    @Param('id') id: number,
  ): Promise<OrderItemsEntity | unknown> {
    const result: OrderItemsEntity | unknown =
      await this.orderItemsService.getDetailOrderItem(id);
    return result;
  }

  // // 3. Add
  // @Post("/add")
  // async addOrderItem(
  //   @Body() body: CreateOrderItemDTO
  // ): Promise<OrderItemsEntity | unknown> {
  //   const result: string | unknown = await this.orderItemsService.addOrderItem(
  //     body
  //   );
  //   return result;
  // }

  // // 4. Delete
  // @Delete("/delete/:id")
  // @UseInterceptors(CheckOrderItemExist)
  // async deleteOrderItem(
  //   @Param("id") id: number
  // ): Promise<OrderItemsEntity | unknown> {
  //   const result: string | unknown =
  //     await this.orderItemsService.deleteOrderItem(id);
  //   return result;
  // }

  // // 5. Update
  // @Patch("update/:id")
  // @UseInterceptors(CheckOrderItemExist)
  // async updateOrderItem(
  //   @Param("id") id: number,
  //   @Body() body: UpdateOrderItemDTO
  // ): Promise<OrderItemsEntity | unknown> {
  //   const result = await this.orderItemsService.updateOrderItem(id, body);
  //   return result;
  // }
}
