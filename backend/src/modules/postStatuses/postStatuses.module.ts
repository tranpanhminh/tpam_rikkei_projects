import { Module } from '@nestjs/common';
import { PostStatusesService } from './postStatuses.service';
import { PostStatusesController } from './postStatuses.controller';
import { PostStatusesRepository } from './postStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostStatusesEntity } from './database/entity/postStatuses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostStatusesEntity])],
  controllers: [PostStatusesController],
  providers: [PostStatusesService, PostStatusesRepository],
})
export class PostStatusesModule {}
