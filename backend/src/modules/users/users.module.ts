import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './database/entity/users.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), NestjsFormDataModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CloudinaryService],
})
export class UsersModule {}
