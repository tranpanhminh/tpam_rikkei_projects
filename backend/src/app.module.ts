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
import { ServicesModule } from './modules/services/services.module';
import { ServiceCommentsModule } from './modules/serviceComments/serviceComments.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PostsModule } from './modules/posts/posts.module';
import { PagesModule } from './modules/pages/pages.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './modules/google/GoogleStrategy';
import { EmailModule } from './modules/email/email.module';
import { EmailService } from './modules/email/email.service';
import { CsvModule } from 'nest-csv-parser';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MyGateway } from './modules/gateway/gateway';
import { MyGatewayModule } from './modules/gateway/gateway.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot(ormConfig),
    CloudinaryModule,
    PaypalModule,
    JwtModule,
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
    ServicesModule,
    ServiceCommentsModule,
    BookingsModule,
    PostsModule,
    PagesModule,
    EmailModule,
    CsvModule,
    MyGatewayModule,
  ],
  controllers: [PaypalController],
  providers: [
    PaypalProvider,
    PaypalService,
    JwtService,
    GoogleStrategy,
    EmailService,
    MyGateway,
  ],
})
export class AppModule {}
