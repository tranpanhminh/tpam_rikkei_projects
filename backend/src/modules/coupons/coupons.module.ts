import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { CouponsRepository } from './coupons.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponsEntity } from './database/entity/coupons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponsEntity])],
  controllers: [CouponsController],
  providers: [CouponsService, CouponsRepository],
})
export class CouponsModule {}
