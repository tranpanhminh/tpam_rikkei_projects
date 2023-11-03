import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemsEntity } from './database/entity/orderItems.entity';
import { OrderItemInterface } from './interface/orderItem.interface';

@Injectable()
export class OrderItemsRepository {
  constructor(
    @InjectRepository(OrderItemsEntity)
    private orderItemsEntity: Repository<OrderItemsEntity>,
  ) {}

  // 1. Get All
  async getAllOrderItems() {
    return await this.orderItemsEntity.find();
  }

  // 2. Get Detail
  async getDetailOrderItem(id: number): Promise<OrderItemsEntity | unknown> {
    const detailOrderItem = await this.orderItemsEntity.find({
      where: { order_id: id },
    });
    return detailOrderItem;
  }

  // 3. Add
  async addOrderItem(
    newOrderItem: OrderItemInterface,
  ): Promise<OrderItemsEntity | unknown> {
    return await this.orderItemsEntity.save(newOrderItem);
  }

  // 4. Report Order Items
  async reportOrderItems(): Promise<OrderItemsEntity | unknown> {
    return await this.orderItemsEntity.find();
  }
}
