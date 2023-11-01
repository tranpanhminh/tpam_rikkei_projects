import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'orm.config';
import { VendorsModule } from './modules/vendors/vendors.module';
import { UserStatusesModule } from './modules/userStatuses/userStatuses.module';
import { PostStatusesModule } from './modules/postStatuses/postStatuses.module';
import { UserRolesModule } from './modules/userRoles/userRoles.module';
import { CancelReasonsModule } from './modules/cancelReasons/cancelReasons.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { BookingStatusesModule } from './modules/bookingStatuses/bookingStatuses.module';
import { OrderStatusesModule } from './modules/orderStatuses/orderStatuses.module';
import { PostTypesModule } from './modules/postTypes/postTypes.module';
import { WorkingTimeModule } from './modules/workingTime/workingTime.module';
import { UsersModule } from './modules/users/users.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductImagesModule } from './modules/productImages/productImages.module';
import { ProductCommentsModule } from './modules/productComments/productComments.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderItemsModule } from './modules/orderItems/orderItems.module';
import { PaypalModule } from './modules/paypal/paypal.module';
import { PaypalController } from './modules/paypal/paypal.controller';
import { PaypalService } from './modules/paypal/paypal.service';
import { PaypalProvider } from './modules/paypal/paypal.provider';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    CloudinaryModule,
    PaypalModule,
    VendorsModule,
    UserStatusesModule,
    PostStatusesModule,
    UserRolesModule,
    CancelReasonsModule,
    CouponsModule,
    PaymentsModule,
    BookingStatusesModule,
    OrderStatusesModule,
    PostTypesModule,
    WorkingTimeModule,
    UsersModule,
    ProductsModule,
    ProductImagesModule,
    ProductCommentsModule,
    CartsModule,
    OrdersModule,
    OrderItemsModule,
  ],
  controllers: [PaypalController],
  providers: [PaypalProvider, PaypalService],
})
export class AppModule {}
