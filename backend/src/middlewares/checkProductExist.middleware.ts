import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ProductsRepository } from 'src/modules/products/products.repository';

@Injectable()
export class CheckProductExist implements NestMiddleware {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const id = req.params.id;
    const find = await this.productsRepository.getDetailProduct(id);
    if (!find) {
      throw new NotFoundException('Product ID is not found');
    }
    next();
  }
}
