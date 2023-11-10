import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ConfigModule } from '@nestjs/config';
import { ProductsEntity } from './database/entity/products.entity';
import { FormDataRequest } from 'nestjs-form-data';
import { UpdateProductImageDTO } from './dto/updateProductImage.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';
import { ImportProductsDTO } from './dto/importProducts.dto';

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
  async getAllProducts(@Query() query): Promise<ProductsEntity[] | unknown> {
    const page = query.page;
    const limit = query.limit;
    const sort = query.sort;
    const order = query.order;
    if (page && limit) {
      return await this.productsService.filterPagination(page, limit);
    } else if (sort && order) {
      return await this.productsService.sortAndOrder(sort, order);
    } else {
      return await this.productsService.getAllProducts();
    }
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailProduct(
    @Param('id') id: number,
  ): Promise<ProductsEntity | unknown> {
    const result: ProductsEntity | unknown =
      await this.productsService.getDetailProduct(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
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
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async deleteProduct(
    @Param('id') id: number,
  ): Promise<ProductsEntity | unknown> {
    const result: string | unknown =
      await this.productsService.deleteProduct(id);
    return result;
  }

  // 5. Update
  @Patch('/update/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async updateProduct(
    @Param('id') id: number,
    @Body() body: UpdateProductDTO,
  ): Promise<ProductsEntity | unknown> {
    const result: string | unknown = await this.productsService.updateProduct(
      id,
      body,
    );
    return result;
  }

  // 6. Change Thumbnail
  @Patch('/:id/update-thumbnail/:imageId')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
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
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
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

  // 7. Update Product Image
  @Post('/import')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  @FormDataRequest()
  async importProducts(
    @Body() body,
  ): Promise<ImportProductsDTO[] | unknown | any> {
    const result = await this.productsService.importProducts(body);
    return result;
  }

  // 7. Update Product Image
  @Get('/export')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async exportProducts(
    @Res() res: Response,
  ): Promise<ImportProductsDTO[] | unknown | any> {
    const result = await this.productsService.exportProducts(res);
    return result;
  }
}
