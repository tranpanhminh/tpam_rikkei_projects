import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsEntity } from './database/entity/carts.entity';
import { CreateCartDTO } from './dto/create-cart.dto';
import { UpdateCartDTO } from './dto/update-cart.dto';

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
  async getDetailCart(id: number): Promise<CartsEntity> {
    const detailCart = await this.cartsEntity.findOneById(id);
    return detailCart;
  }

  // // 3. Add
  // async addCart(newCart: CreateCartDTO): Promise<CartsEntity | unknown> {
  //   return await this.cartsEntity.save(newCart);
  // }

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
}
