import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalProvider } from './paypal.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from '../orders/database/entity/orders.entity';
import { OrderItemsEntity } from '../orderItems/database/entity/orderItems.entity';
import { OrdersRepository } from '../orders/orders.repository';
import { OrderItemsRepository } from '../orderItems/orderItems.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity, OrderItemsEntity])],
  providers: [
    PaypalProvider,
    PaypalService,
    OrdersRepository,
    OrderItemsRepository,
  ],
  exports: [PaypalProvider, PaypalService],
})
export class PaypalModule {}
