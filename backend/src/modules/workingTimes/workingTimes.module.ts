import { Module } from '@nestjs/common';
import { PostStatusesService } from './workingTimes.service';
import { PostStatusesController } from './workingTimes.controller';
import { PostStatusesRepository } from './workingTimes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostStatusesEntity } from './database/entity/workingTimes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostStatusesEntity])],
  controllers: [PostStatusesController],
  providers: [PostStatusesService, PostStatusesRepository],
})
export class PostStatusesModule {}
