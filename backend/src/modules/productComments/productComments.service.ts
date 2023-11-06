import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductCommentsEntity } from './database/entity/productComments.entity';
import { CreateProductCommentDTO } from './dto/create-product-comment.dto';
import { ProductCommentsRepository } from 'src/modules/productComments/productComments.repository';
import { ProductCommentsInterface } from './interface/productComments.interface';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class ProductCommentsService {
  constructor(
    private readonly productCommentsRepository: ProductCommentsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  // 1. Get All
  async getAllProductComments() {
    const result = await this.productCommentsRepository.getAllProductComments();
    return result;
  }

  // 2. Get Detail
  async getDetailProductComment(
    id: number,
  ): Promise<ProductCommentsEntity | unknown> {
    const detailProductComment: ProductCommentsEntity | unknown =
      await this.productCommentsRepository.getDetailProductComment(id);
    if (detailProductComment) {
      return detailProductComment;
    }
  }

  // // 3. Add
  async addProductComment(
    id: number,
    userId: number,
    body: CreateProductCommentDTO,
  ): Promise<ProductCommentsEntity | unknown> {
    const { comment, rating } = body;
    const findUser = await this.usersRepository.getDetailUser(userId);

    const newProductComment: ProductCommentsInterface = {
      comment: comment,
      rating: findUser.role_id == 1 || findUser.role_id == 2 ? 5 : rating,
      user_id: userId,
      post_id: id,
      post_type_id: 1,
    };
    await this.productCommentsRepository.addProductComment(newProductComment);
    return new HttpException('Product Comment Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteProductComment(
    id: number,
  ): Promise<ProductCommentsEntity | unknown> {
    const checkProductComment =
      await this.productCommentsRepository.getDetailProductComment(id);
    if (checkProductComment) {
      await this.productCommentsRepository.deleteProductComment(id);
      return new HttpException('Product Comment Deleted', HttpStatus.OK);
    }
  }

  // 5. Get All Comments By Product
  async getAllCommentsByProduct(
    id: number,
  ): Promise<ProductCommentsEntity | unknown> {
    const result =
      await this.productCommentsRepository.getAllCommentsByProduct(id);
    return result;
  }

  // // 6. Report Comments
  // async reportProductComments(): Promise<ProductCommentsEntity | unknown> {
  //   const result = await this.productCommentsRepository.reportProductComments();
  //   return result;
  // }
}
