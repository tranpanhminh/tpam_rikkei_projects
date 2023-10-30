import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from './database/entity/products.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductInterface } from './interface/product.interface';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsEntity: Repository<ProductsEntity>,
  ) {}

  // 1. Get All
  async getAllProducts(): Promise<ProductsEntity[]> {
    return await this.productsEntity.find();
  }

  // 2. Get Detail
  async getDetailProduct(id: number): Promise<ProductsEntity> {
    return await this.productsEntity.findOne({
      where: { id: id },
      relations: { vendors: true, post_types: true },
    });
  }

  // 3. Add
  async addProduct(
    newProduct: ProductInterface,
  ): Promise<ProductsEntity | unknown | any> {
    console.log(newProduct, 'NEW PRODUCT');
    // return await this.productsEntity.save(newProduct);
  }

  // 4. Add
  async deleteProduct(id: number): Promise<ProductsEntity | unknown> {
    return await this.productsEntity.delete(id);
  }

  // 5. Update
  async updateProduct(
    id: number,
    updateProduct: UpdateProductDTO,
  ): Promise<ProductsEntity | unknown> {
    return await this.productsEntity.update(id, updateProduct);
  }
}
