import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderStatusesRepository } from './orderStatuses.repository';
import { OrderStatusesEntity } from './database/entity/orderStatuses.entity';
import { CreateOrderStatusDTO } from './dto/create-orderStatus.dto';
import { UpdateOrderStatusDTO } from './dto/update-orderStatus.dto';

@Injectable()
export class OrderStatusesService {
  constructor(
    private readonly orderStatusesRepository: OrderStatusesRepository,
  ) {}

  // 1. Get All
  async getAllOrderStatuses() {
    const result = await this.orderStatusesRepository.getAllOrderStatuses();
    return result;
  }

  // 2. Get Detail
  async getDetailOrderStatus(
    id: number,
  ): Promise<OrderStatusesEntity | unknown> {
    const detailOrderStatus: OrderStatusesEntity | unknown =
      await this.orderStatusesRepository.getDetailOrderStatus(id);
    if (detailOrderStatus) {
      return detailOrderStatus;
    }
  }

  // 3. Add
  async addOrderStatus(
    body: CreateOrderStatusDTO,
  ): Promise<OrderStatusesEntity | unknown> {
    const { name } = body;
    const newOrderStatus = {
      name: name,
    };
    await this.orderStatusesRepository.addOrderStatus(newOrderStatus);
    return new HttpException('OrderStatus Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteOrderStatus(id: number): Promise<OrderStatusesEntity | unknown> {
    const checkOrderStatus =
      await this.orderStatusesRepository.getDetailOrderStatus(id);
    if (checkOrderStatus) {
      await this.orderStatusesRepository.deleteOrderStatus(id);
      return new HttpException('OrderStatus Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updateOrderStatus(
    id: number,
    body: UpdateOrderStatusDTO,
  ): Promise<OrderStatusesEntity | unknown> {
    const { name } = body;
    const checkOrderStatus: OrderStatusesEntity =
      await this.orderStatusesRepository.getDetailOrderStatus(id);
    if (checkOrderStatus) {
      const updateOrderStatus = {
        name: !name ? checkOrderStatus.name : name,
      };
      await this.orderStatusesRepository.updateOrderStatus(
        id,
        updateOrderStatus,
      );
      return new HttpException('OrderStatus Updated', HttpStatus.OK);
    }
  }
}
