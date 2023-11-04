import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { OrderStatusesRepository } from 'src/modules/orderStatuses/orderStatuses.repository';

@Injectable()
export class CheckOrderStatusExistBeforeUpdate implements NestMiddleware {
  constructor(
    private readonly orderStatusesRepository: OrderStatusesRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const statusId = req.body.status_id;
    const getAllOrderStatuses =
      await this.orderStatusesRepository.getAllOrderStatuses();
    const allStatuses = getAllOrderStatuses.map((status) => {
      return status.id.toString();
    });
    if (!allStatuses.includes(statusId.toString())) {
      throw new NotFoundException('Order Status ID is not found');
    }

    next();
  }
}
