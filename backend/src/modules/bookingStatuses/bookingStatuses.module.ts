import { Module } from '@nestjs/common';
import { UserStatusesService } from './bookingStatuses.service';
import { UserStatusesController } from './bookingStatuses.controller';
import { UserStatusesRepository } from './bookingStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatusesEntity } from './database/entity/bookingStatuses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatusesEntity])],
  controllers: [UserStatusesController],
  providers: [UserStatusesService, UserStatusesRepository],
})
export class UserStatusesModule {}
