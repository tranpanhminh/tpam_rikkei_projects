import { Module } from '@nestjs/common';
import { CancelReasonsService } from './cancelReasons.service';
import { CancelReasonsController } from './cancelReasons.controller';
import { CancelReasonsRepository } from './cancelReasons.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancelReasonsEntity } from './database/entity/cancelReasons.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UsersEntity } from '../users/database/entity/users.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([CancelReasonsEntity, UsersEntity]),
    JwtModule,
  ],
  controllers: [CancelReasonsController],
  providers: [
    CancelReasonsService,
    CancelReasonsRepository,
    UsersService,
    UsersRepository,
    CloudinaryService,
    // MyGateway,
  ],
})
export class CancelReasonsModule {}
