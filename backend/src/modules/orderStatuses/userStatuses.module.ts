import { Module } from '@nestjs/common';
import { UserStatusesService } from './userStatuses.service';
import { UserStatusesController } from './userStatuses.controller';
import { UserStatusesRepository } from './userStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatusesEntity } from './database/entity/userStatuses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatusesEntity])],
  controllers: [UserStatusesController],
  providers: [UserStatusesService, UserStatusesRepository],
})
export class UserStatusesModule {}
