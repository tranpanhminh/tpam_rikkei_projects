import { Module } from '@nestjs/common';
import { PostStatusesService } from './payments.service';
import { PostStatusesController } from './payments.controller';
import { PostStatusesRepository } from './payments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostStatusesEntity } from './database/entity/payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostStatusesEntity])],
  controllers: [PostStatusesController],
  providers: [PostStatusesService, PostStatusesRepository],
})
export class PostStatusesModule {}
