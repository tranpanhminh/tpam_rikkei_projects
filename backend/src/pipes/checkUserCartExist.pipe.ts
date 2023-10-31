import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { CartsRepository } from 'src/modules/carts/carts.repository';

@Injectable()
export class CheckUserCartExist implements PipeTransform {
  constructor(private readonly cartsRepository: CartsRepository) {}

  async transform(value) {
    const getId = Number(value);

    const findCart = await this.cartsRepository.getDetailCartByUser(getId);
    if (findCart.length === 0) {
      throw new NotFoundException('User Cart is empty');
    }

    return value;
  }
}