import { Controller, Get } from '@nestjs/common';
import { ProductImagesService } from './productImages.service';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/product-images`)
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  // 1. Get All
  @Get()
  async getAllProductImages() {
    const result = await this.productImagesService.getAllProductImages();
    return result;
  }

  // // 2. Get Detail
  // @Get("/detail/:id")
  // @UseInterceptors(CheckProductImageExist)
  // async getDetailProductImage(
  //   @Param("id") id: number
  // ): Promise<ProductImagesEntity | unknown> {
  //   const result: ProductImagesEntity | unknown =
  //     await this.productImagesService.getDetailProductImage(id);
  //   return result;
  // }

  // // 3. Add
  // @Post("/add")
  // async addProductImage(
  //   @Body() body: CreateProductImageDTO
  // ): Promise<ProductImagesEntity | unknown> {
  //   const result: string | unknown =
  //     await this.productImagesService.addProductImage(body);
  //   return result;
  // }

  // // 4. Delete
  // @Delete("/delete/:id")
  // @UseInterceptors(CheckProductImageExist)
  // async deleteProductImage(
  //   @Param("id") id: number
  // ): Promise<ProductImagesEntity | unknown> {
  //   const result: string | unknown =
  //     await this.productImagesService.deleteProductImage(id);
  //   return result;
  // }

  // // 5. Update
  // @Patch("update/:id")
  // @UseInterceptors(CheckProductImageExist)
  // async updateProductImage(
  //   @Param("id") id: number,
  //   @Body() body: UpdateProductImageDTO
  // ): Promise<ProductImagesEntity | unknown> {
  //   const result = await this.productImagesService.updateProductImage(id, body);
  //   return result;
  // }
}
