import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './../modules/products/products.repository';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class CheckBeforeAddProductComment implements PipeTransform {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async transform(value: { id: string; userId: string }) {
    const { id, userId } = value;
    const getId = Number(id);
    const getUserId = Number(userId);
    const findProduct = await this.productsRepository.getDetailProduct(getId);
    const findUser = await this.usersRepository.getDetailUser(getUserId);
    if (!findProduct) {
      throw new NotFoundException('Product ID is not found');
    }

    if (!findUser) {
      throw new NotFoundException('User ID is not found');
    }

    return { id: getId, userId: getUserId };
  }
}
