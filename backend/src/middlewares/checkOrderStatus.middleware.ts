import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { OrdersRepository } from 'src/modules/orders/orders.repository';

@Injectable()
export class CheckOrderStatus implements NestMiddleware {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const id = req.params.id;
    const findOrder = await this.ordersRepository.getDetailOrder(id);

    if (findOrder.status_id == 5) {
      throw new NotFoundException(
        "You can't cancel because this order has cancelled before",
      );
    }

    next();
  }
}
