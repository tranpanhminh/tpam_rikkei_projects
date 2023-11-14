import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { CartsRepository } from 'src/modules/carts/carts.repository';
import { CartInterface } from 'src/modules/carts/interface/cart.interface';
import { ProductsRepository } from 'src/modules/products/products.repository';
@Injectable()
export class CheckQuantityAddToCart implements NestMiddleware {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly cartsRepository: CartsRepository,
  ) {}
  async use(req: any, res: Response, next: NextFunction) {
    const getProductId = req.params.id;
    const getUserId = req.params.userId;
    const getQuantity = req.body.quantity;
    const findProduct =
      await this.productsRepository.getDetailProduct(getProductId);

    const findProductInCart: CartInterface =
      await this.cartsRepository.findUserAndProductInCart(
        getUserId,
        getProductId,
      );

    if (findProductInCart) {
      if (
        Number(getQuantity) + Number(findProductInCart.quantity) >
        Number(findProduct.quantity_stock)
      ) {
        throw new NotAcceptableException(
          `You can't add more than ${findProduct.quantity_stock} you have added ${findProductInCart.quantity}`,
        );
      }
    }
    next();
  }
}
