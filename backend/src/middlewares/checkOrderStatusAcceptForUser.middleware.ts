import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { OrderStatusesRepository } from 'src/modules/orderStatuses/orderStatuses.repository';
import { OrdersRepository } from 'src/modules/orders/orders.repository';

@Injectable()
export class CheckOrderStatusAcceptForUser implements NestMiddleware {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderStatusesRepository: OrderStatusesRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getOrderId = req.params.id;

    const findOrder = await this.ordersRepository.getDetailOrder(getOrderId);

    if (findOrder.status_id == 2) {
      throw new BadRequestException(
        "Order can't be cancelled because it is Processing",
      );
    }

    if (findOrder.status_id == 3) {
      throw new BadRequestException(
        "Order can't be cancelled because it is Shipping",
      );
    }

    if (findOrder.status_id == 4) {
      throw new BadRequestException(
        "Order can't be cancelled because it was shipped",
      );
    }

    if (findOrder.status_id == 4) {
      throw new BadRequestException(
        "Order can't be cancelled because it was canceled",
      );
    }

    next();
  }
}
