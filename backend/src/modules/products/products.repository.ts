import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from './database/entity/products.entity';
import { ProductInterface } from './interface/product.interface';
import { AddProductImagesInterface } from './interface/addProductImages.interface';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';
import { ChangeThumbnailProductInterface } from './interface/changeThumbnail.interface';
import { UpdateProductImageInterface } from './interface/updateProductImage.interface';
import { UpdateProductInterface } from './interface/updateProduct.interface';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsEntity: Repository<ProductsEntity>,
    @InjectRepository(ProductImagesEntity)
    private readonly productImagesEntity: Repository<ProductImagesEntity>,
  ) {}

  // 1. Get All
  async getAllProducts(): Promise<ProductsEntity[]> {
    return await this.productsEntity.find({
      relations: {
        vendors: true,
        post_types: true,
        product_images: true,
        product_comments: true,
      },
    });
  }

  // 2. Get Detail
  async getDetailProduct(id: number): Promise<ProductsEntity> {
    return await this.productsEntity.findOne({
      where: { id: id },
      relations: {
        vendors: true,
        post_types: true,
        product_images: true,
        product_comments: true,
      },
    });
  }

  // 2. Get Detail Original
  async getDetail(id: number): Promise<ProductsEntity> {
    return await this.productsEntity.findOne({
      where: { id: id },
    });
  }

  // 3. Add
  async addProduct(
    newProduct: ProductInterface,
  ): Promise<ProductsEntity | unknown> {
    return await this.productsEntity.save(newProduct);
  }

  // Upload Product Image
  async uploadProductImages(
    data: AddProductImagesInterface,
  ): Promise<ProductImagesEntity> {
    return await this.productImagesEntity.save(data);
  }

  // Get Detail Product Image
  async getDetailProductImage(imageId: number): Promise<ProductImagesEntity> {
    return await this.productImagesEntity.findOne({ where: { id: imageId } });
  }

  // 4. Delete
  async deleteProduct(id: number): Promise<ProductsEntity | unknown> {
    return await this.productsEntity.delete(id);
  }

  // 5. Update
  async updateProduct(
    id: number,
    updateProduct: UpdateProductInterface,
  ): Promise<ProductsEntity | unknown> {
    return await this.productsEntity.update(id, updateProduct);
  }

  // 6. Change Thumbnail
  async changeThumbnail(
    productId: number,
    updateProduct: ChangeThumbnailProductInterface,
  ): Promise<ProductsEntity | unknown> {
    return await this.productsEntity.update(productId, updateProduct);
  }

  // 7. Update Product Image
  async updateProductImage(
    imageId: number,
    updatedProductImage: UpdateProductImageInterface,
  ): Promise<ProductImagesEntity | unknown> {
    return await this.productImagesEntity.update(imageId, updatedProductImage);
  }
}
