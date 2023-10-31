import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemsEntity } from './database/entity/orderItems.entity';

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
  async getDetailOrderItem(id: number): Promise<OrderItemsEntity> {
    const detailOrderItem = await this.orderItemsEntity.findOneById(id);
    return detailOrderItem;
  }

  // // 3. Add
  // async addOrderItem(
  //   newOrderItem: CreateOrderItemDTO
  // ): Promise<OrderItemsEntity | unknown> {
  //   return await this.orderItemsEntity.save(newOrderItem);
  // }

  // // 4. Add
  // async deleteOrderItem(id: number): Promise<OrderItemsEntity | unknown> {
  //   return await this.orderItemsEntity.delete(id);
  // }

  // // 5. Update
  // async updateOrderItem(
  //   id: number,
  //   updateOrderItem: UpdateOrderItemDTO
  // ): Promise<OrderItemsEntity | unknown> {
  //   return await this.orderItemsEntity.update(id, updateOrderItem);
  // }
}
