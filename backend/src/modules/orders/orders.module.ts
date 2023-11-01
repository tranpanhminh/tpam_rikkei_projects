import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './database/entity/orders.entity';
import { CheckUserExist } from 'src/middlewares/checkUserExist.middleware';
import { ConfigModule } from '@nestjs/config';
import { OrderItemsEntity } from '../orderItems/database/entity/orderItems.entity';
import { UsersEntity } from '../users/database/entity/users.entity';
import { UsersRepository } from '../users/users.repository';
import { CheckUserCartExist } from 'src/middlewares/checkUserCartExist.middleware';
import { CartsEntity } from '../carts/database/entity/carts.entity';
import { CartsRepository } from '../carts/carts.repository';
import { CheckIsAdmin } from 'src/middlewares/checkIsAdmin.middleware';
import { PaypalService } from '../paypal/paypal.service';
import { CouponsEntity } from '../coupons/database/entity/coupons.entity';
import { CouponsRepository } from '../coupons/coupons.repository';
import { OrderItemsRepository } from '../orderItems/orderItems.repository';
import { ProductsEntity } from '../products/database/entity/products.entity';
import { ProductsRepository } from '../products/products.repository';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;
const url = `${path}/orders`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersEntity,
      OrderItemsEntity,
      UsersEntity,
      CartsEntity,
      CouponsEntity,
      OrderItemsEntity,
      ProductsEntity,
      ProductImagesEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersRepository,
    UsersRepository,
    CartsRepository,
    PaypalService,
    CouponsRepository,
    OrderItemsRepository,
    ProductsRepository,
  ],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserExist, CheckIsAdmin, CheckUserCartExist).forRoutes({
      path: `${url}/checkout/users/:userId`,
      method: RequestMethod.POST,
    });
  }
}
