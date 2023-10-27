import { Module } from '@nestjs/common';
import { CancelReasonsService } from './cancelReasons.service';
import { CancelReasonsController } from './cancelReasons.controller';
import { CancelReasonsRepository } from './cancelReasons.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancelReasonsEntity } from './database/entity/cancelReasons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CancelReasonsEntity])],
  controllers: [CancelReasonsController],
  providers: [CancelReasonsService, CancelReasonsRepository],
})
export class CancelReasonsModule {}
