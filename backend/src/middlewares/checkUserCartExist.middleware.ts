import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { CartsRepository } from 'src/modules/carts/carts.repository';

@Injectable()
export class CheckUserCartExist implements NestMiddleware {
  constructor(private readonly cartsRepository: CartsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getUserId = req.params.userId;
    const findUserCart =
      await this.cartsRepository.getDetailCartByUser(getUserId);
    if (findUserCart.length === 0) {
      throw new NotAcceptableException('Your Cart is empty');
    }
    next();
  }
}
