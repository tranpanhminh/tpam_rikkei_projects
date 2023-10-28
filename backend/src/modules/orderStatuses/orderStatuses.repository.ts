import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderStatusesEntity } from "./database/entity/orderStatuses.entity";
import { CreateOrderStatusDTO } from "./dto/create-orderStatus.dto";
import { UpdateOrderStatusDTO } from "./dto/update-orderStatus.dto";

@Injectable()
export class OrderStatusesRepository {
  constructor(
    @InjectRepository(OrderStatusesEntity)
    private orderStatusesEntity: Repository<OrderStatusesEntity>
  ) {}

  // 1. Get All
  async getAllOrderStatuses() {
    return await this.orderStatusesEntity.find();
  }

  // 2. Get Detail
  async getDetailOrderStatus(id: number): Promise<OrderStatusesEntity> {
    const detailOrderStatus = await this.orderStatusesEntity.findOneById(id);
    return detailOrderStatus;
  }

  // 3. Add
  async addOrderStatus(
    newOrderStatus: CreateOrderStatusDTO
  ): Promise<OrderStatusesEntity | unknown> {
    return await this.orderStatusesEntity.save(newOrderStatus);
  }

  // 4. Add
  async deleteOrderStatus(id: number): Promise<OrderStatusesEntity | unknown> {
    return await this.orderStatusesEntity.delete(id);
  }

  // 5. Update
  async updateOrderStatus(
    id: number,
    updateOrderStatus: UpdateOrderStatusDTO
  ): Promise<OrderStatusesEntity | unknown> {
    return await this.orderStatusesEntity.update(id, updateOrderStatus);
  }
}
