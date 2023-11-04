import { Controller, Get, Param } from '@nestjs/common';
import { ProductImagesService } from './productImages.service';
import { ConfigModule } from '@nestjs/config';
import { ProductImagesEntity } from './database/entity/productImages.entity';

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

  // 2. Get Detail
  @Get('/detail/:imageId')
  async getDetailProductImage(
    @Param('imageId') imageId: number,
  ): Promise<ProductImagesEntity | unknown> {
    const result: ProductImagesEntity | unknown =
      await this.productImagesService.getDetailProductImage(imageId);
    return result;
  }
}
