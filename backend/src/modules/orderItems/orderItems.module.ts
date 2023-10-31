import { Module } from '@nestjs/common';
import { OrderItemsService } from './orderItems.service';
import { OrderItemsController } from './orderItems.controller';
import { OrderItemsRepository } from './orderItems.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsEntity } from './database/entity/orderItems.entity';
import { OrdersEntity } from '../orders/database/entity/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemsEntity, OrdersEntity])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsRepository],
})
export class OrderItemsModule {}
