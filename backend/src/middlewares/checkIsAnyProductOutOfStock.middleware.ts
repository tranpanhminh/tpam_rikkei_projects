import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction } from 'express';
import { CartsRepository } from 'src/modules/carts/carts.repository';
import { ProductsRepository } from 'src/modules/products/products.repository';

@Injectable()
export class CheckIsAnyProductOutOfStock implements NestMiddleware {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async use(req: any, res: any, next: NextFunction) {
    const getUserId = req.params.userId;
    const getProductOutOfStock =
      await this.productsRepository.getAllProductsOutOfStock();

    for (const product of getProductOutOfStock) {
      try {
        const checkCart =
          await this.cartsRepository.getDetailCartItemByUserAndProduct(
            product.id,
            getUserId,
          );

        if (checkCart) {
          await this.cartsRepository.deleteProductFromUserCart(checkCart.id);
          throw new NotFoundException(
            'Some products are out of stock. Please reload the page.',
          );
        }
      } catch (error) {
        // Handle the error
        throw new NotFoundException(
          'Some products are out of stock. Please reload the page.',
        );
      }
    }

    // If no out-of-stock products found in the user's cart, proceed to the next middleware/handler
    next();
  }
}
