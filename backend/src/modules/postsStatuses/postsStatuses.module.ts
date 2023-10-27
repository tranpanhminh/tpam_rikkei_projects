import { Module } from '@nestjs/common';
import { PostsStatusesService } from './postsStatuses.service';
import { PostsStatusesController } from './postsStatuses.controller';
import { PostsStatusesRepository } from './postsStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsStatusesEntity } from './database/entity/postsStatuses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostsStatusesEntity])],
  controllers: [PostsStatusesController],
  providers: [PostsStatusesService, PostsStatusesRepository],
})
export class PostsStatusesModule {}
