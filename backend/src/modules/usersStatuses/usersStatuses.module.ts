import { Module } from '@nestjs/common';
import { UsersStatusesService } from './usersStatuses.service';
import { UsersStatusesController } from './usersStatuses.controller';
import { UsersStatusesRepository } from './usersStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersStatusesEntity } from './database/entity/usersStatuses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersStatusesEntity])],
  controllers: [UsersStatusesController],
  providers: [UsersStatusesService, UsersStatusesRepository],
})
export class UsersStatusesModule {}
