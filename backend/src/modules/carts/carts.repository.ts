import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsEntity } from './database/entity/carts.entity';
import { CartInterface } from './interface/cart.interface';

@Injectable()
export class CartsRepository {
  constructor(
    @InjectRepository(CartsEntity)
    private readonly cartsEntity: Repository<CartsEntity>,
  ) {}

  // 1. Get All
  async getAllCarts() {
    return await this.cartsEntity.find();
  }

  // 2. Get Detail
  async getDetailCartByUser(id: number): Promise<CartsEntity | any> {
    const detailCart = await this.cartsEntity.find({
      where: { user_id: id },
    });
    return detailCart;
  }

  async getDetailCartItemByUserAndProduct(
    productId: number,
    userId: number,
  ): Promise<CartsEntity | any> {
    const detailCart = await this.cartsEntity.findOne({
      where: { product_id: productId, user_id: userId },
    });
    return detailCart;
  }

  // 3. Add
  async addProductToCart(
    newCart: CartInterface,
  ): Promise<CartsEntity | unknown> {
    return await this.cartsEntity.save(newCart);
  }

  // 4. Delete
  async deleteProductFromUserCart(
    cartItemId: number,
  ): Promise<CartsEntity | unknown> {
    return await this.cartsEntity.delete(cartItemId);
  }

  // 5. Delete All Products From Cart
  async deleteAllProductsFromUserCart(
    userId: number,
  ): Promise<CartsEntity | unknown | any> {
    return await this.cartsEntity
      .createQueryBuilder()
      .delete()
      .from(CartsEntity)
      .where({ user_id: userId })
      .execute();
  }

  // // 5. Update
  // async updateCart(
  //   id: number,
  //   updateCart: UpdateCartDTO
  // ): Promise<CartsEntity | unknown> {
  //   return await this.cartsEntity.update(id, updateCart);
  // }

  // 6. Find User And Product In Cart
  async findUserAndProductInCart(
    userId: number,
    productId: number,
  ): Promise<CartsEntity | unknown> {
    return await this.cartsEntity.findOne({
      where: { user_id: userId, product_id: productId },
    });
  }

  // 7. Update Product In Cart
  async updateQuantityInCart(
    cartId: number,
    updatedCart: CartInterface,
  ): Promise<CartsEntity | unknown> {
    return await this.cartsEntity.update(cartId, updatedCart);
  }
}
