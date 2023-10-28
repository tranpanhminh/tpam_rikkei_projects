import { Module } from "@nestjs/common";
import { OrderStatusesService } from "./orderStatuses.service";
import { OrderStatusesController } from "./orderStatuses.controller";
import { OrderStatusesRepository } from "./orderStatuses.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderStatusesEntity } from "./database/entity/orderStatuses.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusesEntity])],
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService, OrderStatusesRepository],
})
export class OrderStatusesModule {}
