import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction } from 'express';
import { OrdersRepository } from 'src/modules/orders/orders.repository';

@Injectable()
export class CheckOrderExist implements NestMiddleware {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const findOrder = await this.ordersRepository.getDetailOrder(getId);
    if (!findOrder) {
      throw new NotFoundException('Order ID not found');
    }
    next();
  }
}
