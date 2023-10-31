import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from 'src/modules/products/products.repository';

@Injectable()
export class CheckProductExist implements PipeTransform {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async transform(value) {
    const getId = Number(value);
    const find = await this.productsRepository.getDetailProduct(getId);

    if (!find) {
      throw new NotFoundException('Product ID is not found');
    }

    return Number(getId);
  }
}
