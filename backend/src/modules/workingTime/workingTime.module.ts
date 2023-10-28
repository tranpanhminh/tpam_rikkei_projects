import { Module } from '@nestjs/common';
import { WorkingTimeService } from './workingTime.service';
import { WorkingTimeController } from './workingTime.controller';
import { WorkingTimeRepository } from './workingTime.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingTimeEntity } from './database/entity/workingTime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkingTimeEntity])],
  controllers: [WorkingTimeController],
  providers: [WorkingTimeService, WorkingTimeRepository],
})
export class WorkingTimeModule {}
