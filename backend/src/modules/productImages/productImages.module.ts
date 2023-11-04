import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductImagesService } from './productImages.service';
import { ProductImagesController } from './productImages.controller';
import { ProductImagesRepository } from './productImages.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImagesEntity } from './database/entity/productImages.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CheckProductImageExist } from 'src/middlewares/checkProductImageExist.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/product-images`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImagesEntity]),
    NestjsFormDataModule,
  ],
  controllers: [ProductImagesController],
  providers: [ProductImagesService, ProductImagesRepository, CloudinaryService],
})
export class ProductImagesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckProductImageExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
  }
}
