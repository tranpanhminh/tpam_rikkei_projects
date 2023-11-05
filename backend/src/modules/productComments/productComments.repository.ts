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
  async getAllProductComments(): Promise<ProductCommentsEntity[]> {
    return await this.productCommentsEntity.find({
      relations: { users: true, post_types: true, products: true },
    });
  }

  // 2. Get Detail
  async getDetailProductComment(id: number): Promise<ProductCommentsEntity> {
    const detailProductComment = await this.productCommentsEntity.findOne({
      where: { id: id },
      relations: { users: true, post_types: true, products: true },
    });
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
    return await this.productCommentsEntity.find({
      where: { post_id: id },
      relations: { users: true, post_types: true },
    });
  }

  // 5. Get All Comments By Product
  async reportProductComment(): Promise<ProductCommentsEntity[] | unknown> {
    const result = await this.productCommentsEntity
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.postType', 'postType')
      .leftJoinAndSelect('product.vendor', 'vendor')
      .leftJoinAndSelect('product.images', 'images')
      .addSelect('AVG(product.comments.rating)', 'avgRating')
      .addSelect('COUNT(product.comments.id)', 'totalReviews')
      .leftJoin('product.comments', 'comments')
      .where('comments.userRole NOT IN (:ids)', { ids: [1, 2] })
      .groupBy('product.id')
      .getRawMany();
    return result;
  }
}
