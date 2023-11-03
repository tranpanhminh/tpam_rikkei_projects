import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { PagesRepository } from './pages.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesEntity } from './database/entity/pages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagesEntity])],
  controllers: [PagesController],
  providers: [PagesService, PagesRepository],
})
export class PagesModule {}
