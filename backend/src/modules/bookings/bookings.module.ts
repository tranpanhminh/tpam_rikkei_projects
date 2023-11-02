import { Module } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { BookingsRepository } from "./bookings.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingsEntity } from "./database/entity/bookings.entity";
import { CartsEntity } from "../carts/database/entity/carts.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookingsEntity, CartsEntity])],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository],
})
export class BookingsModule {}
