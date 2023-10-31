import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { OrdersRepository } from "./orders.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersEntity } from "./database/entity/orders.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
