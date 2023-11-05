import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrderItemsService } from './orderItems.service';
import { ConfigModule } from '@nestjs/config';
import { OrderItemsEntity } from './database/entity/orderItems.entity';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';

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
  @UseGuards(AuthenticationGuard)
  async getAllOrderItems() {
    const result = await this.orderItemsService.getAllOrderItems();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  @UseGuards(AuthenticationGuard)
  async getDetailOrderItem(
    @Param('id') id: number,
  ): Promise<OrderItemsEntity | unknown> {
    const result: OrderItemsEntity | unknown =
      await this.orderItemsService.getDetailOrderItem(id);
    return result;
  }

  // 3. Report Order Items
  @Get('/report')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async reportOrderItems(): Promise<OrderItemsEntity | unknown> {
    const result: OrderItemsEntity | unknown =
      await this.orderItemsService.reportOrderItems();
    return result;
  }
}
