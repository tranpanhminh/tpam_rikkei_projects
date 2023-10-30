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

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    CloudinaryModule,
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
  ],
  controllers: [],
})
export class AppModule {}
