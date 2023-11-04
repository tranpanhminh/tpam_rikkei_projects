import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './database/entity/products.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';
import { ProductImagesRepository } from '../productImages/productImages.repository';
import { CheckProductExist } from 'src/middlewares/checkProductExist.middleware';
import { CheckProductImageExist } from 'src/middlewares/checkProductImageExist.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/products`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, ProductImagesEntity]),
    NestjsFormDataModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    CloudinaryService,
    ProductImagesRepository,
  ],
  exports: [ProductsRepository],
})
export class ProductsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckProductExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckProductExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckProductExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
    consumer.apply(CheckProductExist, CheckProductImageExist).forRoutes({
      path: `${url}/:id/update-thumbnail/:imageId`,
      method: RequestMethod.PATCH,
    });
    consumer.apply(CheckProductExist, CheckProductImageExist).forRoutes({
      path: `${url}/:id/update-image/:imageId`,
      method: RequestMethod.PATCH,
    });
  }
}
