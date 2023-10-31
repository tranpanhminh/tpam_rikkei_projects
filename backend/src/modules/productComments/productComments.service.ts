import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductCommentsEntity } from './database/entity/productComments.entity';
import { CreateProductCommentDTO } from './dto/create-product-comment.dto';
import { ProductCommentsRepository } from 'src/modules/productComments/productComments.repository';
import { ProductCommentsInterface } from './interface/productComments.interface';

@Injectable()
export class ProductCommentsService {
  constructor(
    private readonly productCommentsRepository: ProductCommentsRepository,
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
    console.log(rating, 'RATING');
    const newProductComment: ProductCommentsInterface = {
      comment: comment,
      rating: rating,
      user_id: userId,
      post_id: id,
      post_type_id: 1,
    };
    await this.productCommentsRepository.addProductComment(newProductComment);
    return new HttpException('Product Comment Added', HttpStatus.OK);
  }

  // // 4. Delete
  // async deleteProductComment(id: number): Promise<ProductCommentsEntity | unknown> {
  //   const checkProductComment =
  //     await this.productCommentsRepository.getDetailProductComment(id);
  //   if (checkProductComment) {
  //     await this.productCommentsRepository.deleteProductComment(id);
  //     return new HttpException('ProductComment Deleted', HttpStatus.OK);
  //   }
  // }

  // // 5. Update
  // async updateProductComment(
  //   id: number,
  //   body: UpdateProductCommentDTO,
  // ): Promise<ProductCommentsEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const checkProductComment: ProductCommentsEntity =
  //     await this.productCommentsRepository.getDetailProductComment(id);
  //   if (checkProductComment) {
  //     const updateProductComment = {
  //       name: !name ? checkProductComment.name : name,
  //       code: !code ? checkProductComment.code : code,
  //       discount_rate: !discount_rate
  //         ? checkProductComment.discount_rate
  //         : discount_rate,
  //       min_bill: !min_bill ? checkProductComment.min_bill : min_bill,
  //     };
  //     await this.productCommentsRepository.updateProductComment(
  //       id,
  //       updateProductComment,
  //     );
  //     return new HttpException('ProductComment Updated', HttpStatus.OK);
  //   }
  // }
}
