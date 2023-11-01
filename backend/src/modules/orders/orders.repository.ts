import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersEntity } from './database/entity/orders.entity';
import { OrdersInterface } from './interface/orders.interface';

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

  // 3. Checkout
  async checkOutOrder(newOrder: any): Promise<OrdersEntity | unknown> {
    return await this.ordersEntity.save(newOrder);
  }

  // 4. Add
  async addOrder(orderInfo: OrdersInterface): Promise<OrdersEntity | unknown> {
    return await this.ordersEntity.save(orderInfo);
  }

  // 5. Update
  // async updateOrder(
  //   id: number,
  //   updateOrder: UpdateOrderDTO
  // ): Promise<OrdersEntity | unknown> {
  //   return await this.ordersEntity.update(id, updateOrder);
  // }
}
