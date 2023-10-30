import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductImagesRepository } from './productImages.repository';
import { ProductImagesEntity } from './database/entity/productImages.entity';

@Injectable()
export class ProductImagesService {
  constructor(
    private readonly productImagesRepository: ProductImagesRepository,
  ) {}

  // 1. Get All
  async getAllProductImages() {
    const result = await this.productImagesRepository.getAllProductImages();
    return result;
  }

  // // 2. Get Detail
  // async getDetailProductImage(
  //   id: number,
  // ): Promise<ProductImagesEntity | unknown> {
  //   const detailProductImage: ProductImagesEntity | unknown =
  //     await this.productImagesRepository.getDetailProductImage(id);
  //   if (detailProductImage) {
  //     return detailProductImage;
  //   }
  // }

  // // 3. Add
  // async addProductImage(
  //   body: CreateProductImageDTO,
  // ): Promise<ProductImagesEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const newProductImage = {
  //     name: name,
  //     code: code,
  //     discount_rate: discount_rate,
  //     min_bill: min_bill,
  //   };
  //   await this.productImagesRepository.addProductImage(newProductImage);
  //   return new HttpException('ProductImage Added', HttpStatus.OK);
  // }

  // // 4. Delete
  // async deleteProductImage(id: number): Promise<ProductImagesEntity | unknown> {
  //   const checkProductImage =
  //     await this.productImagesRepository.getDetailProductImage(id);
  //   if (checkProductImage) {
  //     await this.productImagesRepository.deleteProductImage(id);
  //     return new HttpException('ProductImage Deleted', HttpStatus.OK);
  //   }
  // }

  // // 5. Update
  // async updateProductImage(
  //   id: number,
  //   body: UpdateProductImageDTO,
  // ): Promise<ProductImagesEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const checkProductImage: ProductImagesEntity =
  //     await this.productImagesRepository.getDetailProductImage(id);
  //   if (checkProductImage) {
  //     const updateProductImage = {
  //       name: !name ? checkProductImage.name : name,
  //       code: !code ? checkProductImage.code : code,
  //       discount_rate: !discount_rate
  //         ? checkProductImage.discount_rate
  //         : discount_rate,
  //       min_bill: !min_bill ? checkProductImage.min_bill : min_bill,
  //     };
  //     await this.productImagesRepository.updateProductImage(
  //       id,
  //       updateProductImage,
  //     );
  //     return new HttpException('ProductImage Updated', HttpStatus.OK);
  //   }
  // }
}
