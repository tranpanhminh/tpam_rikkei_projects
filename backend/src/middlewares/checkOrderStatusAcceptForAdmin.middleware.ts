import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { OrderStatusesRepository } from 'src/modules/orderStatuses/orderStatuses.repository';
import { OrdersRepository } from 'src/modules/orders/orders.repository';

@Injectable()
export class CheckOrderStatusAcceptForAdmin implements NestMiddleware {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderStatusesRepository: OrderStatusesRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getOrderId = req.params.id;
    const getStatus = req.body.status_id;
    const findOrder = await this.ordersRepository.getDetailOrder(getOrderId);

    if (findOrder.status_id > getStatus) {
      throw new NotAcceptableException(
        "You can't change previous order status",
      );
    }

    next();
  }
}
