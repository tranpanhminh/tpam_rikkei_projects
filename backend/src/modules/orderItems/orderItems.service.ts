import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  // // 3. Add
  // async addOrderItem(
  //   body: CreateOrderItemDTO
  // ): Promise<OrderItemsEntity | unknown> {
  //   const { name } = body;
  //   console.log(body, "AFAS");
  //   const newOrderItem = {
  //     name: name,
  //   };
  //   await this.orderItemsRepository.addOrderItem(newOrderItem);
  //   return new HttpException("OrderItem Added", HttpStatus.OK);
  // }

  // // 4. Delete
  // async deleteOrderItem(id: number): Promise<OrderItemsEntity | unknown> {
  //   const checkOrderItem = await this.orderItemsRepository.getDetailOrderItem(
  //     id
  //   );
  //   if (checkOrderItem) {
  //     await this.orderItemsRepository.deleteOrderItem(id);
  //     return new HttpException("OrderItem Deleted", HttpStatus.OK);
  //   }
  // }

  // // 5. Update
  // async updateOrderItem(
  //   id: number,
  //   body: UpdateOrderItemDTO
  // ): Promise<OrderItemsEntity | unknown> {
  //   const { name } = body;
  //   const checkOrderItem: OrderItemsEntity =
  //     await this.orderItemsRepository.getDetailOrderItem(id);
  //   if (checkOrderItem) {
  //     const updateOrderItem = {
  //       name: !name ? checkOrderItem.name : name,
  //     };
  //     await this.orderItemsRepository.updateOrderItem(id, updateOrderItem);
  //     return new HttpException("OrderItem Updated", HttpStatus.OK);
  //   }
  // }
}
