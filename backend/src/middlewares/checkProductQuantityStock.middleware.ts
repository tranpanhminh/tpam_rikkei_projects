import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { ProductsRepository } from 'src/modules/products/products.repository';

@Injectable()
export class CheckProductQuantityStock implements NestMiddleware {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getProductId = req.params.id;

    const findProduct =
      await this.productsRepository.getDetailProduct(getProductId);

    if (findProduct.quantity_stock == 0) {
      throw new NotAcceptableException('Product Quantity is out of stock');
    }

    next();
  }
}
