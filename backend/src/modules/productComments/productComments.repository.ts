import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCommentsEntity } from './database/entity/productComments.entity';
import { ProductCommentsInterface } from './interface/productComments.interface';

@Injectable()
export class ProductCommentsRepository {
  constructor(
    @InjectRepository(ProductCommentsEntity)
    public productCommentsEntity: Repository<ProductCommentsEntity>,
  ) {}

  // 1. Get All
  async getAllProductComments() {
    return await this.productCommentsEntity.find();
  }

  // 2. Get Detail
  async getDetailProductComment(id: number): Promise<ProductCommentsEntity> {
    const detailProductComment =
      await this.productCommentsEntity.findOneById(id);
    return detailProductComment;
  }

  // 3. Add
  async addProductComment(
    newProductComment: ProductCommentsInterface,
  ): Promise<ProductCommentsEntity | unknown> {
    return await this.productCommentsEntity.save(newProductComment);
  }

  // 4. Delete
  async deleteProductComment(
    id: number,
  ): Promise<ProductCommentsEntity | unknown> {
    return await this.productCommentsEntity.delete(id);
  }

  // 5. Get All Comments By Product
  async getAllCommentsByProduct(
    id: number,
  ): Promise<ProductCommentsEntity | unknown> {
    return await this.productCommentsEntity.find({ where: { post_id: id } });
  }
}
