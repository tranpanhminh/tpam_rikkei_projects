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

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    VendorsModule,
    UserStatusesModule,
    PostStatusesModule,
    UserRolesModule,
    CancelReasonsModule,
    CouponsModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
