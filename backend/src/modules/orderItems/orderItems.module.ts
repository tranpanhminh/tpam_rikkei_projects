import { Module } from '@nestjs/common';
import { OrderItemsService } from './orderItems.service';
import { OrderItemsController } from './orderItems.controller';
import { OrderItemsRepository } from './orderItems.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsEntity } from './database/entity/orderItems.entity';
import { OrdersEntity } from '../orders/database/entity/orders.entity';
import { ProductsEntity } from '../products/database/entity/products.entity';
import { OrdersRepository } from '../orders/orders.repository';
import { UsersEntity } from '../users/database/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderItemsEntity,
      OrdersEntity,
      ProductsEntity,
      OrdersEntity,
      UsersEntity,
    ]),
    JwtModule,
  ],
  controllers: [OrderItemsController],
  providers: [
    OrderItemsService,
    OrderItemsRepository,
    OrdersRepository,
    UsersRepository,
    UsersService,
    CloudinaryService,
    // MyGateway,
  ],
  exports: [OrderItemsService, OrderItemsRepository],
})
export class OrderItemsModule {}
