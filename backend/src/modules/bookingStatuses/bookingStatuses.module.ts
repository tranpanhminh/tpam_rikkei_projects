import { Module } from "@nestjs/common";
import { BookingStatusesService } from "./bookingStatuses.service";
import { BookingStatusesController } from "./bookingStatuses.controller";
import { BookingStatusesRepository } from "./bookingStatuses.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingStatusesEntity } from "./database/entity/bookingStatuses.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookingStatusesEntity])],
  controllers: [BookingStatusesController],
  providers: [BookingStatusesService, BookingStatusesRepository],
})
export class BookingStatusesModule {}
