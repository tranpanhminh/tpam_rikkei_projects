import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImagesEntity } from './database/entity/productImages.entity';

@Injectable()
export class ProductImagesRepository {
  constructor(
    @InjectRepository(ProductImagesEntity)
    public productImagesEntity: Repository<ProductImagesEntity>,
  ) {}

  // 1. Get All
  async getAllProductImages() {
    return await this.productImagesEntity.find();
  }

  // 2. Get Detail
  async getDetailProductImage(id: number): Promise<ProductImagesEntity> {
    const detailProductImage = await this.productImagesEntity.findOneById(id);
    return detailProductImage;
  }

  // // 3. Add
  // async addProductImage(
  //   newProductImage: CreateProductImageDTO,
  // ): Promise<ProductImagesEntity | unknown> {
  //   return await this.productImagesEntity.save(newProductImage);
  // }

  // // 4. Add
  // async deleteProductImage(id: number): Promise<ProductImagesEntity | unknown> {
  //   return await this.productImagesEntity.delete(id);
  // }

  // // 5. Update
  // async updateProductImage(
  //   id: number,
  //   updateProductImage: UpdateProductImageDTO,
  // ): Promise<ProductImagesEntity | unknown> {
  //   return await this.productImagesEntity.update(id, updateProductImage);
  // }
}
