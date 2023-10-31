import { Module } from "@nestjs/common";
import { CartsService } from "./carts.service";
import { CartsController } from "./carts.controller";
import { CartsRepository } from "./carts.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartsEntity } from "./database/entity/carts.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CartsEntity])],
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
})
export class CartsModule {}
