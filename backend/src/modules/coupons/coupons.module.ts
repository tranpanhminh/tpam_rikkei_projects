import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { CouponsRepository } from './coupons.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponsEntity } from './database/entity/coupons.entity';
import { CouponExistRule } from 'src/pipes/checkExist/checkExist';

@Module({
  imports: [TypeOrmModule.forFeature([CouponsEntity])],
  controllers: [CouponsController],
  providers: [CouponsService, CouponsRepository, CouponExistRule],
})
export class CouponsModule {}
