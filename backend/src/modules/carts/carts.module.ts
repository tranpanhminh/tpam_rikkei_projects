import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsEntity } from './database/entity/carts.entity';
import { UsersEntity } from '../users/database/entity/users.entity';
import { UsersRepository } from '../users/users.repository';
import { ConfigModule } from '@nestjs/config';
import { ProductsEntity } from '../products/database/entity/products.entity';
import { ProductsRepository } from '../products/products.repository';
import { ProductImagesRepository } from '../productImages/productImages.repository';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';
import { CheckProductQuantityStock } from 'src/middlewares/checkProductQuantityStock.middleware';
import { CheckInputQuantity } from 'src/middlewares/checkInputQuantity.middleware';
import { CheckProductExistInUserCart } from 'src/middlewares/checkProductExistInUserCart.middleware';
import { CheckUserExist } from 'src/middlewares/checkUserExist.middleware';
import { CheckUserCartExist } from 'src/middlewares/checkUserCartExist.middleware';
import { CouponsEntity } from '../coupons/database/entity/coupons.entity';
import { CouponsRepository } from '../coupons/coupons.repository';
import { CheckProductExist } from 'src/middlewares/checkProductExist.middleware';
import { CheckIsAdmin } from 'src/middlewares/checkIsAdmin.middleware';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;
const url = `${path}/carts`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartsEntity,
      UsersEntity,
      ProductsEntity,
      ProductImagesEntity,
      CouponsEntity,
    ]),
    JwtModule,
  ],
  controllers: [CartsController],
  providers: [
    CartsService,
    CartsRepository,
    UsersRepository,
    ProductsRepository,
    ProductImagesRepository,
    CouponsRepository,
    UsersService,
    CloudinaryService,
  ],
  exports: [CartsRepository],
})
export class CartsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CheckProductExist,
        CheckUserExist,
        CheckIsAdmin,
        CheckProductQuantityStock,
        CheckInputQuantity,
      )
      .forRoutes({
        path: `${url}/add/products/:id/users/:userId`,
        method: RequestMethod.POST,
      });
    consumer.apply(CheckUserExist).forRoutes({
      path: `${url}/detail/users/:userId`,
      method: RequestMethod.GET,
    });
    consumer
      .apply(CheckProductExist, CheckUserExist, CheckProductExistInUserCart)
      .forRoutes({
        path: `${url}/delete/products/:id/users/:userId`,
        method: RequestMethod.DELETE,
      });
    consumer.apply(CheckUserExist, CheckUserCartExist).forRoutes({
      path: `${url}/delete/users/:userId`,
      method: RequestMethod.DELETE,
    });
    consumer
      .apply(CheckProductExist, CheckUserExist, CheckInputQuantity)
      .forRoutes({
        path: `${url}/update/products/:id/users/:userId`,
        method: RequestMethod.PATCH,
      });
  }
}
