import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { CartsRepository } from 'src/modules/carts/carts.repository';

@Injectable()
export class CheckProductExistInUserCart implements NestMiddleware {
  constructor(private readonly cartsRepository: CartsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getProductId = req.params.id;
    const getUserId = req.params.userId;
    const findCartItem =
      await this.cartsRepository.getDetailCartItemByUserAndProduct(
        getProductId,
        getUserId,
      );
    if (!findCartItem) {
      throw new NotFoundException('Product ID is not found in User Cart');
    }
    next();
  }
}
