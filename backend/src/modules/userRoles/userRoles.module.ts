import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserRolesService } from './userRoles.service';
import { UserRolesController } from './userRoles.controller';
import { UserRolesRepository } from './userRoles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesEntity } from './database/entity/userRoles.entity';
import { CheckUserRoleExist } from 'src/middlewares/checkUserRoleExist.middleware';
import { UsersEntity } from '../users/database/entity/users.entity';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

const path = process.env.SERVER_PATH;
const url = `${path}/user-roles`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRolesEntity, UsersEntity]),
    JwtModule,
  ],
  controllers: [UserRolesController],
  providers: [
    UserRolesService,
    UserRolesRepository,
    UsersRepository,
    UsersService,
    CloudinaryService,
  ],
})
export class UserRolesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserRoleExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckUserRoleExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckUserRoleExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
