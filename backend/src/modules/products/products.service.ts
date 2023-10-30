import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductsEntity } from "./database/entity/products.entity";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

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
  async addProduct(body: CreateProductDTO): Promise<ProductsEntity | unknown> {
    const { name } = body;
    const newProduct = {
      name: name,
    };
    await this.productsRepository.addProduct(newProduct);
    return new HttpException("Product Added", HttpStatus.OK);
  }

  // 4. Delete
  async deleteProduct(id: number): Promise<ProductsEntity | unknown> {
    const checkProduct = await this.productsRepository.getDetailProduct(id);
    if (checkProduct) {
      await this.productsRepository.deleteProduct(id);
      return new HttpException("Product Deleted", HttpStatus.OK);
    }
  }

  // 5. Update
  async updateProduct(
    id: number,
    body: UpdateProductDTO
  ): Promise<ProductsEntity | unknown> {
    const { name } = body;
    const checkProduct: ProductsEntity =
      await this.productsRepository.getDetailProduct(id);
    if (checkProduct) {
      const updateProduct = {
        name: !name ? checkProduct.name : name,
      };
      await this.productsRepository.updateProduct(id, updateProduct);
      return new HttpException("Product Updated", HttpStatus.OK);
    }
  }
}
