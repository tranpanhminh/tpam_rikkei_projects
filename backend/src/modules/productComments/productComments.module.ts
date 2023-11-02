import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductCommentsService } from './productComments.service';
import { ProductCommentsController } from './productComments.controller';
import { ProductCommentsRepository } from './productComments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCommentsEntity } from './database/entity/productComments.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ProductsEntity } from '../products/database/entity/products.entity';
import { ProductsRepository } from '../products/products.repository';
import { ProductImagesRepository } from '../productImages/productImages.repository';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';
import { UsersEntity } from '../users/database/entity/users.entity';
import { UsersRepository } from '../users/users.repository';
import { CheckProductCommentExist } from 'src/middlewares/checkProductCommentExist.middleware';
import { CheckUserExist } from 'src/middlewares/checkUserExist.middleware';
import { CheckProductExist } from 'src/middlewares/checkProductExist.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/comments/products`;

// -------------------------------------------------------
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCommentsEntity,
      ProductsEntity,
      ProductImagesEntity,
      UsersEntity,
    ]),
    NestjsFormDataModule,
  ],
  controllers: [ProductCommentsController],
  providers: [
    ProductCommentsService,
    ProductCommentsRepository,
    CloudinaryService,
    ProductsRepository,
    ProductImagesRepository,
    UsersRepository,
  ],
})
export class ProductCommentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckProductExist, CheckUserExist).forRoutes({
      path: `${url}/add/:id/users/:userId`,
      method: RequestMethod.POST,
    });
    consumer.apply(CheckProductCommentExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckProductCommentExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
  }
}
