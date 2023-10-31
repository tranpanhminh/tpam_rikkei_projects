import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { CartsEntity } from './database/entity/carts.entity';
import { CreateCartDTO } from './dto/create-cart.dto';
import { UpdateCartDTO } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(private readonly cartsRepository: CartsRepository) {}

  // 1. Get All
  async getAllCarts() {
    const result = await this.cartsRepository.getAllCarts();
    return result;
  }

  // 2. Get Detail
  async getDetailCart(id: number): Promise<CartsEntity | unknown> {
    const detailCart: CartsEntity | unknown =
      await this.cartsRepository.getDetailCart(id);
    if (detailCart) {
      return detailCart;
    }
  }

  // // 3. Add
  // async addCart(body: CreateCartDTO): Promise<CartsEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const newCart = {
  //     name: name,
  //     code: code,
  //     discount_rate: discount_rate,
  //     min_bill: min_bill,
  //   };
  //   await this.cartsRepository.addCart(newCart);
  //   return new HttpException("Cart Added", HttpStatus.OK);
  // }

  // // 4. Delete
  // async deleteCart(id: number): Promise<CartsEntity | unknown> {
  //   const checkCart = await this.cartsRepository.getDetailCart(id);
  //   if (checkCart) {
  //     await this.cartsRepository.deleteCart(id);
  //     return new HttpException("Cart Deleted", HttpStatus.OK);
  //   }
  // }

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
