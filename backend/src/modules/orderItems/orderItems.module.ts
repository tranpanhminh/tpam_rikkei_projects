import { Module } from '@nestjs/common';
import { OrderItemsService } from './orderItems.service';
import { OrderItemsController } from './orderItems.controller';
import { OrderItemsRepository } from './orderItems.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsEntity } from './database/entity/orderItems.entity';
import { OrdersEntity } from '../orders/database/entity/orders.entity';
import { ProductsEntity } from '../products/database/entity/products.entity';
import { OrdersRepository } from '../orders/orders.repository';
import { PaypalProvider } from '../paypal/paypal.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderItemsEntity,
      OrdersEntity,
      ProductsEntity,
      OrdersEntity,
    ]),
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsRepository, OrdersRepository],
  exports: [OrderItemsService, OrderItemsRepository],
})
export class OrderItemsModule {}
