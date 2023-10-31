import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsEntity } from './database/entity/carts.entity';
import { CartInterface } from './interface/cart.interface';
import { UpdateProductCartInterface } from './interface/update-product-cart.interface';

@Injectable()
export class CartsRepository {
  constructor(
    @InjectRepository(CartsEntity)
    public cartsEntity: Repository<CartsEntity>,
  ) {}

  // 1. Get All
  async getAllCarts() {
    return await this.cartsEntity.find();
  }

  // 2. Get Detail
  async getDetailCartByUser(id: number): Promise<CartsEntity | any> {
    const detailCart = await this.cartsEntity.find({ where: { user_id: id } });
    return detailCart;
  }

  // 3. Add
  async addProductToCart(
    newCart: CartInterface,
  ): Promise<CartsEntity | unknown> {
    return await this.cartsEntity.save(newCart);
  }

  // // 4. Delete
  // async deleteCart(id: number): Promise<CartsEntity | unknown> {
  //   return await this.cartsEntity.delete(id);
  // }

  // // 5. Update
  // async updateCart(
  //   id: number,
  //   updateCart: UpdateCartDTO
  // ): Promise<CartsEntity | unknown> {
  //   return await this.cartsEntity.update(id, updateCart);
  // }

  // 6. FindUserAndProductInCart
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
    updatedCart: UpdateProductCartInterface,
  ): Promise<CartsEntity | unknown> {
    return await this.cartsEntity.update(cartId, updatedCart);
  }
}
