import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsEntity } from './database/entity/carts.entity';
import { UsersEntity } from '../users/database/entity/users.entity';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CartsEntity, UsersEntity])],
  controllers: [CartsController],
  providers: [CartsService, CartsRepository, UsersRepository],
})
export class CartsModule {}
