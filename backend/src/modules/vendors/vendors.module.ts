/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { VendorsRepository } from './vendors.repository';
import { VendorsEntity } from './entity/vendors.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VendorsEntity])],
  controllers: [VendorsController],
  providers: [VendorsService, VendorsRepository],
})
export class VendorsModule {}
