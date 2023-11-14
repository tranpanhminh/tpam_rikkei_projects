import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { CartsEntity } from './database/entity/carts.entity';
import { AddToCartDTO } from './dto/addToCart.dto';
import { ProductsRepository } from '../products/products.repository';
import { CartInterface } from './interface/cart.interface';
import { ProductInterface } from '../products/interface/product.interface';

@Injectable()
export class CartsService {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  // 1. Get All
  async getAllCarts() {
    const result = await this.cartsRepository.getAllCarts();
    return result;
  }

  // 2. Get Detail
  async getDetailCartByUser(id: number): Promise<CartsEntity | unknown> {
    const detailCart: CartsEntity | unknown =
      await this.cartsRepository.getDetailCartByUser(id);
    if (detailCart) {
      return detailCart;
    }
  }

  // 3. Add
  async addProductToCart(
    productId: number,
    userId: number,
    body: AddToCartDTO,
  ): Promise<CartsEntity | unknown> {
    const { quantity } = body;
    const findProduct: ProductInterface =
      await this.productsRepository.getDetail(productId);

    const findProductInCart: CartInterface =
      await this.cartsRepository.findUserAndProductInCart(userId, productId);
    if (findProductInCart) {
      const updateCart: CartInterface = {
        ...findProductInCart,
        quantity: Number(findProductInCart.quantity) + Number(quantity),
      };
      await this.cartsRepository.updateQuantityInCart(
        findProductInCart.id,
        updateCart,
      );
    } else {
      const newCart: CartInterface = {
        user_id: userId,
        product_id: productId,
        quantity: Number(quantity),
        price: Number(findProduct.price),
      };
      await this.cartsRepository.addProductToCart(newCart);
    }
    return new HttpException('Product Added To Cart', HttpStatus.OK);
  }

  // 4. Delete
  async deleteProductFromUserCart(
    productId: number,
    userId: number,
  ): Promise<CartsEntity | unknown> {
    const checkCart =
      await this.cartsRepository.getDetailCartItemByUserAndProduct(
        productId,
        userId,
      );
    if (checkCart) {
      await this.cartsRepository.deleteProductFromUserCart(checkCart.id);
      return new HttpException('Product Deleted', HttpStatus.OK);
    }
  }

  // 5. Delete All Products From User Cart
  async deleteAllProductsFromUserCart(
    userId: number,
  ): Promise<CartsEntity | unknown> {
    const checkCart = await this.cartsRepository.getDetailCartByUser(userId);
    if (checkCart) {
      await this.cartsRepository.deleteAllProductsFromUserCart(userId);
      return new HttpException('All Products Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updateQuantityProductInCart(
    id,
    userId,
    body,
  ): Promise<CartsEntity | unknown> {
    const { quantity } = body;
    const findProduct: ProductInterface =
      await this.productsRepository.getDetail(id);
    if (Number(quantity) < 0 === true) {
      return false;
    }
    if (!/^[0-9]+$/.test(quantity)) {
      return false;
    }
    if (quantity.charAt(0) === '0') {
      return false;
    }
    if (findProduct) {
      const findProductInCart: CartInterface =
        await this.cartsRepository.findUserAndProductInCart(userId, id);
      if (findProductInCart) {
        const updateCart: CartInterface = {
          ...findProductInCart,
          quantity: Number(quantity),
        };
        await this.cartsRepository.updateQuantityInCart(
          findProductInCart.id,
          updateCart,
        );
      }
      return true;
    }
  }
}
