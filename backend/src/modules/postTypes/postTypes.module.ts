import { Module } from '@nestjs/common';
import { PostStatusesService } from './postTypes.service';
import { PostStatusesController } from './postTypes.controller';
import { PostStatusesRepository } from './postTypes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostStatusesEntity } from './database/entity/postTypes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostStatusesEntity])],
  controllers: [PostStatusesController],
  providers: [PostStatusesService, PostStatusesRepository],
})
export class PostStatusesModule {}
