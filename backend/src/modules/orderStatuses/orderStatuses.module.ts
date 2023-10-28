import { Module } from '@nestjs/common';
import { UserStatusesService } from './orderStatuses.service';
import { UserStatusesController } from './orderStatuses.controller';
import { UserStatusesRepository } from './orderStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatusesEntity } from './database/entity/orderStatuses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatusesEntity])],
  controllers: [UserStatusesController],
  providers: [UserStatusesService, UserStatusesRepository],
})
export class UserStatusesModule {}
