import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { ProductCommentsRepository } from 'src/modules/productComments/productComments.repository';

@Injectable()
export class CheckProductCommentExist implements PipeTransform {
  constructor(
    private readonly productCommentsRepository: ProductCommentsRepository,
  ) {}

  async transform(value) {
    const getId = Number(value);
    const find =
      await this.productCommentsRepository.getDetailProductComment(getId);

    if (!find) {
      throw new NotFoundException('Product Comment ID is not found');
    }

    return Number(getId);
  }
}
