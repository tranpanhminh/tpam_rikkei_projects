import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsEntity } from './database/entity/products.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductInterface } from './interface/product.interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { AddProductImagesInterface } from './interface/addProductImages.interface';
import { extractPublicId } from 'cloudinary-build-url';
const cloudinary = require('cloudinary').v2;

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // 1. Get All
  async getAllProducts(): Promise<ProductsEntity[]> {
    const result: ProductsEntity[] =
      await this.productsRepository.getAllProducts();
    return result;
  }

  // 2. Get Detail
  async getDetailProduct(id: number): Promise<ProductsEntity | unknown> {
    const detailProduct: ProductsEntity | unknown =
      await this.productsRepository.getDetailProduct(id);
    if (detailProduct) {
      return detailProduct;
    }
  }

  // 3. Add
  async addProduct(
    body: CreateProductDTO,
  ): Promise<ProductsEntity | unknown | any> {
    const { name, description, price, quantity_stock, vendor_id } = body;
    const fileUploaded: any = body.image_url;
    const result = await this.cloudinaryService.uploadFiles(fileUploaded);
    const newProduct: ProductInterface = {
      name: name,
      description: description,
      price: Number(price),
      quantity_stock: Number(quantity_stock),
      thumbnail_url: result[0].secure_url,
      vendor_id: vendor_id,
      post_type_id: 1,
    };
    const addProduct: any =
      await this.productsRepository.addProduct(newProduct);

    for (let i = 0; i < result.length; i++) {
      const imagesInfo: AddProductImagesInterface = {
        product_id: addProduct.id,
        image_url: result[i].secure_url,
      };
      await this.productsRepository.uploadProductImages(imagesInfo);
    }

    return new HttpException('Product Added', HttpStatus.OK);
  }

  // 4. Delete
  async deleteProduct(id: number): Promise<ProductsEntity | unknown | any> {
    const checkProduct = await this.productsRepository.getDetailProduct(id);
    if (checkProduct) {
      const listImages = checkProduct.product_images.map((item) => {
        return extractPublicId(item.image_url);
      });
      await cloudinary.api.delete_resources(listImages);
      await this.productsRepository.deleteProduct(id);
      return new HttpException('Product Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updateProduct(
    id: number,
    body: UpdateProductDTO,
  ): Promise<ProductsEntity | unknown> {
    const { name } = body;
    const checkProduct: ProductsEntity =
      await this.productsRepository.getDetailProduct(id);
    if (checkProduct) {
      const updateProduct = {
        name: !name ? checkProduct.name : name,
      };
      await this.productsRepository.updateProduct(id, updateProduct);
      return new HttpException('Product Updated', HttpStatus.OK);
    }
  }
}
