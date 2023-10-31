import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersEntity } from './database/entity/orders.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrdersEntity)
    public ordersEntity: Repository<OrdersEntity>,
  ) {}

  // 1. Get All
  async getAllOrders() {
    return await this.ordersEntity.find();
  }

  // 2. Get Detail
  async getDetailOrder(id: number): Promise<OrdersEntity> {
    const detailOrder = await this.ordersEntity.findOneById(id);
    return detailOrder;
  }

  // 3. Add
  async checkOutOrder(newOrder: any): Promise<OrdersEntity | unknown> {
    return await this.ordersEntity.save(newOrder);
  }

  // 4. Add
  // async deleteOrder(id: number): Promise<OrdersEntity | unknown> {
  //   return await this.ordersEntity.delete(id);
  // }

  // 5. Update
  // async updateOrder(
  //   id: number,
  //   updateOrder: UpdateOrderDTO
  // ): Promise<OrdersEntity | unknown> {
  //   return await this.ordersEntity.update(id, updateOrder);
  // }
}
