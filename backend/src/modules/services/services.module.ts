import { Module } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { ServicesController } from "./services.controller";
import { ServicesRepository } from "./services.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesEntity } from "./database/entity/services.entity";
import { CartsEntity } from "../carts/database/entity/carts.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ServicesEntity, CartsEntity])],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository],
})
export class ServicesModule {}
