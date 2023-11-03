import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalProvider } from './paypal.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from '../orders/database/entity/orders.entity';
import { OrderItemsEntity } from '../orderItems/database/entity/orderItems.entity';
import { OrdersRepository } from '../orders/orders.repository';
import { OrderItemsRepository } from '../orderItems/orderItems.repository';
import { CartsEntity } from '../carts/database/entity/carts.entity';
import { CartsRepository } from '../carts/carts.repository';
import { ProductsRepository } from '../products/products.repository';
import { ProductsEntity } from '../products/database/entity/products.entity';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersEntity,
      OrderItemsEntity,
      CartsEntity,
      ProductsEntity,
      ProductImagesEntity,
    ]),
  ],
  providers: [
    PaypalProvider,
    PaypalService,
    OrdersRepository,
    OrderItemsRepository,
    CartsRepository,
    ProductsRepository,
  ],
  exports: [PaypalProvider, PaypalService],
})
export class PaypalModule {}
