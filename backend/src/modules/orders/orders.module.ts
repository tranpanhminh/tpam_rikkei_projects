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
import { CheckOrderExist } from 'src/middlewares/checkOrderExist.middleware';
import { CheckOrderStatusExistBeforeUpdate } from 'src/middlewares/checkOrderStatusExistBeforeUpdate.middleware';
import { OrderStatusesEntity } from '../orderStatuses/database/entity/orderStatuses.entity';
import { OrderStatusesRepository } from '../orderStatuses/orderStatuses.repository';
import { CheckOrderStatusAcceptForAdmin } from 'src/middlewares/checkOrderStatusAcceptForAdmin.middleware';
import { CheckCancelReasonBeforeCancel } from 'src/middlewares/checkCancelReasonExistBeforeCancel.middleware';
import { CancelReasonsEntity } from '../cancelReasons/database/entity/cancelReasons.entity';
import { CancelReasonsRepository } from '../cancelReasons/cancelReasons.repository';
import { CheckOrderStatus } from 'src/middlewares/checkOrderStatus.middleware';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

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
      OrderStatusesEntity,
      CancelReasonsEntity,
    ]),
    JwtModule,
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
    OrderStatusesRepository,
    CancelReasonsRepository,
    UsersRepository,
    UsersService,
    CloudinaryService,
  ],
  exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckOrderExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckOrderExist).forRoutes({
      path: `${url}/:id/detail`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckUserExist).forRoutes({
      path: `${url}/users/:userId`,
      method: RequestMethod.GET,
    });
    consumer
      .apply(
        CheckOrderExist,
        CheckOrderStatusExistBeforeUpdate,
        CheckOrderStatusAcceptForAdmin,
      )
      .forRoutes({
        path: `${url}/update/:id`,
        method: RequestMethod.PATCH,
      });
    consumer.apply(CheckCancelReasonBeforeCancel, CheckOrderStatus).forRoutes({
      path: `${url}/cancel-order/:id`,
      method: RequestMethod.PATCH,
    });
    consumer.apply(CheckUserExist, CheckIsAdmin, CheckUserCartExist).forRoutes({
      path: `${url}/checkout/users/:userId`,
      method: RequestMethod.POST,
    });
  }
}
