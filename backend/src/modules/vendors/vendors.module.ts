/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { VendorsRepository } from './vendors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsEntity } from './database/entity/vendors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VendorsEntity])],
  controllers: [VendorsController],
  providers: [VendorsService, VendorsRepository],
})
export class VendorsModule {}
