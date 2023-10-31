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
import { CheckProductAndUserBeforeAddToCart } from 'src/middlewares/checkProductAndUserBeforeAddToCart.middleware';
import { ProductsEntity } from '../products/database/entity/products.entity';
import { ProductsRepository } from '../products/products.repository';
import { ProductImagesRepository } from '../productImages/productImages.repository';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';
import { CheckProductQuantityStock } from 'src/middlewares/checkProductQuantityStock.middleware';
import { CheckInputQuantity } from 'src/middlewares/checkInputQuantity.middleware';
import { CheckProductExistInUserCart } from 'src/middlewares/checkProductExistInUserCart.middleware';

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
    ]),
  ],
  controllers: [CartsController],
  providers: [
    CartsService,
    CartsRepository,
    UsersRepository,
    ProductsRepository,
    ProductImagesRepository,
  ],
})
export class CartsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CheckProductAndUserBeforeAddToCart,
        CheckProductQuantityStock,
        CheckInputQuantity,
      )
      .forRoutes({
        path: `${url}/add/products/:id/users/:userId`,
        method: RequestMethod.POST,
      });
    consumer
      .apply(CheckProductAndUserBeforeAddToCart, CheckProductExistInUserCart)
      .forRoutes({
        path: `${url}/delete/products/:id/users/:userId`,
        method: RequestMethod.DELETE,
      });
  }
}
