import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderStatusesService } from './orderStatuses.service';
import { CreateOrderStatusDTO } from './dto/create-orderStatus.dto';
import { UpdateOrderStatusDTO } from './dto/update-orderStatus.dto';
import { ConfigModule } from '@nestjs/config';
import { OrderStatusesEntity } from './database/entity/orderStatuses.entity';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/order-statuses`)
export class OrderStatusesController {
  constructor(private readonly orderStatusesService: OrderStatusesService) {}

  // 1. Get All
  @Get()
  async getAllOrderStatuses() {
    const result = await this.orderStatusesService.getAllOrderStatuses();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailOrderStatus(
    @Param('id') id: number,
  ): Promise<OrderStatusesEntity | unknown> {
    const result: OrderStatusesEntity | unknown =
      await this.orderStatusesService.getDetailOrderStatus(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async addOrderStatus(
    @Body() body: CreateOrderStatusDTO,
  ): Promise<OrderStatusesEntity | unknown> {
    const result: string | unknown =
      await this.orderStatusesService.addOrderStatus(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async deleteOrderStatus(
    @Param('id') id: number,
  ): Promise<OrderStatusesEntity | unknown> {
    const result: string | unknown =
      await this.orderStatusesService.deleteOrderStatus(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() body: UpdateOrderStatusDTO,
  ): Promise<OrderStatusesEntity | unknown> {
    const result = await this.orderStatusesService.updateOrderStatus(id, body);
    return result;
  }
}
