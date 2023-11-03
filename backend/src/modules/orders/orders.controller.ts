import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import { OrdersEntity } from './database/entity/orders.entity';
import { CheckOutOrderDTO } from './dto/checkOutOrder.dto';
import { OrderItemsEntity } from '../orderItems/database/entity/orderItems.entity';
import { UpdateOrderDTO } from './dto/updateOrder.dto';
import { OrdersInterface } from './interface/orders.interface';

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
  async getDetailOrder(
    @Param('id') id: number,
  ): Promise<OrdersEntity | unknown> {
    const result: OrdersEntity | unknown =
      await this.ordersService.getDetailOrder(id);
    return result;
  }

  // 3. Check Out
  @Post('/checkout/users/:userId')
  async checkOutOrder(
    @Param('userId') userId: number,
    @Body() body: CheckOutOrderDTO,
    @Req() req,
    @Res() res,
  ): Promise<OrdersEntity | unknown | any> {
    const result: string | unknown = await this.ordersService.checkOutOrder(
      userId,
      body,
      req,
      res,
    );
    return result;
  }

  // 4. Get Detail Order Items By Order ID
  @Get('/:id/detail')
  async getDetailOrderItemsByOrderId(
    @Param('id')
    id: number,
  ): Promise<OrderItemsEntity | unknown> {
    const result: OrderItemsEntity | unknown =
      await this.ordersService.getDetailOrderItemsByOrderId(id);
    return result;
  }

  // 5. Get All Orders By User ID
  @Get('/users/:userId')
  async getAllOrdersByUserId(
    @Param('userId')
    userId: number,
  ): Promise<OrdersEntity | unknown> {
    const result: OrdersEntity | unknown =
      await this.ordersService.getAllOrdersByUserId(userId);
    return result;
  }

  // 5. Update Order By Admin
  @Patch('update/:id')
  async updateOrder(
    @Param('id') id: number,
    @Body() body: UpdateOrderDTO,
  ): Promise<OrdersEntity | unknown> {
    const result = await this.ordersService.updateOrder(id, body);
    return result;
  }

  // 6. Cancel Order By Customer
  @Patch('/cancel-order/:id')
  async cancelOrder(
    @Param('id') id: number,
    @Body() body: OrdersInterface,
  ): Promise<OrdersEntity | unknown> {
    const result = await this.ordersService.cancelOrder(id, body);
    return result;
  }
}
