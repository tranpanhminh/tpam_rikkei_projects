import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { ProductsRepository } from 'src/modules/products/products.repository';

@Injectable()
export class CheckInputQuantity implements NestMiddleware {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getProductId = req.params.id;
    const getQuantity = req.body.quantity;

    const findProduct =
      await this.productsRepository.getDetailProduct(getProductId);
    if (findProduct) {
      if (getQuantity > findProduct.quantity_stock) {
        throw new NotAcceptableException(
          `You can't add more than ${findProduct.quantity_stock}`,
        );
      }
    }

    next();
  }
}
