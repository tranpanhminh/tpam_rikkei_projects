import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ConfigModule } from '@nestjs/config';
import { ProductsEntity } from './database/entity/products.entity';
import { CheckProductExist } from 'src/interceptors/checkProductExist';
import { FormDataRequest } from 'nestjs-form-data';
import { CheckProductImageExist } from 'src/interceptors/checkProductImageExist';
import { UpdateProductImageDTO } from './dto/update-product-image.dto';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------

@Controller(`${path}/products`)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 1. Get All
  @Get()
  async getAllProducts(): Promise<ProductsEntity[]> {
    const result: ProductsEntity[] =
      await this.productsService.getAllProducts();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  @UseInterceptors(CheckProductExist)
  async getDetailProduct(
    @Param('id') id: number,
  ): Promise<ProductsEntity | unknown> {
    const result: ProductsEntity | unknown =
      await this.productsService.getDetailProduct(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  @FormDataRequest()
  async addProduct(
    @Body() body: CreateProductDTO,
  ): Promise<ProductsEntity | unknown> {
    const result: string | unknown =
      await this.productsService.addProduct(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseInterceptors(CheckProductExist)
  async deleteProduct(
    @Param('id') id: number,
  ): Promise<ProductsEntity | unknown> {
    const result: string | unknown =
      await this.productsService.deleteProduct(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseInterceptors(CheckProductExist)
  async updateProduct(
    @Param('id') id: number,
    @Body() body: UpdateProductDTO,
  ): Promise<ProductsEntity | unknown> {
    const result = await this.productsService.updateProduct(id, body);
    return result;
  }

  // 6. Change Thumbnail
  @Patch('/:id/update-thumbnail/:imageId')
  @UseInterceptors(CheckProductExist, CheckProductImageExist)
  async changeThumbnail(
    @Param() params,
  ): Promise<ProductsEntity | unknown | any> {
    const result: string | unknown = await this.productsService.changeThumbnail(
      params.id,
      params.imageId,
    );
    return result;
  }

  // 7. Update Product Image
  @Patch('/:id/update-image/:imageId')
  @UseInterceptors(CheckProductExist, CheckProductImageExist)
  @FormDataRequest()
  async updateProductImage(
    @Param() params,
    @Body() body: UpdateProductImageDTO,
  ): Promise<ProductsEntity | unknown> {
    const result: string | unknown =
      await this.productsService.updateProductImage(
        params.id,
        params.imageId,
        body,
      );
    return result;
  }
}
