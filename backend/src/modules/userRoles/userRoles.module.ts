import { Module } from '@nestjs/common';
import { UserRolesService } from './userRoles.service';
import { UserRolesController } from './userRoles.controller';
import { UserRolesRepository } from './userRoles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesEntity } from './database/entity/userRoles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRolesEntity])],
  controllers: [UserRolesController],
  providers: [UserRolesService, UserRolesRepository],
})
export class UserRolesModule {}
