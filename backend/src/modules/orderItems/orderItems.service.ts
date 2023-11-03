import { Injectable } from '@nestjs/common';
import { OrderItemsRepository } from './orderItems.repository';
import { OrderItemsEntity } from './database/entity/orderItems.entity';

@Injectable()
export class OrderItemsService {
  constructor(private readonly orderItemsRepository: OrderItemsRepository) {}

  // 1. Get All
  async getAllOrderItems() {
    const result = await this.orderItemsRepository.getAllOrderItems();
    return result;
  }

  // 2. Get Detail
  async getDetailOrderItem(id: number): Promise<OrderItemsEntity | unknown> {
    const detailOrderItem: OrderItemsEntity | unknown =
      await this.orderItemsRepository.getDetailOrderItem(id);
    if (detailOrderItem) {
      return detailOrderItem;
    }
  }

  // 3. Report Order Items
  async reportOrderItems(): Promise<OrderItemsEntity | unknown> {
    const reportOrderItems: OrderItemsEntity | unknown =
      await this.orderItemsRepository.reportOrderItems();
    if (reportOrderItems) {
      return reportOrderItems;
    }
  }
}
