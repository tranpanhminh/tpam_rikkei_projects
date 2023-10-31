import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { CartsEntity } from './database/entity/carts.entity';
import { AddToCartDTO } from './dto/add-to-cart.dto';
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
    if (findProduct) {
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
      // Giảm số lượng hàng tồn kho
      const updatedProductQuantityStock: ProductInterface = {
        ...findProduct,
        quantity_stock: Number(findProduct.quantity_stock) - Number(quantity),
      };
      await this.productsRepository.updateProduct(
        productId,
        updatedProductQuantityStock,
      );

      return new HttpException('Product Added To Cart', HttpStatus.OK);
    }
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

  // // 5. Update
  // async updateCart(
  //   id: number,
  //   body: UpdateCartDTO
  // ): Promise<CartsEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const checkCart: CartsEntity = await this.cartsRepository.getDetailCart(id);
  //   if (checkCart) {
  //     const updateCart = {
  //       name: !name ? checkCart.name : name,
  //       code: !code ? checkCart.code : code,
  //       discount_rate: !discount_rate ? checkCart.discount_rate : discount_rate,
  //       min_bill: !min_bill ? checkCart.min_bill : min_bill,
  //     };
  //     await this.cartsRepository.updateCart(id, updateCart);
  //     return new HttpException("Cart Updated", HttpStatus.OK);
  //   }
  // }
}
