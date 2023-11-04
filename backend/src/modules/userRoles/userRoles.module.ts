import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserRolesService } from './userRoles.service';
import { UserRolesController } from './userRoles.controller';
import { UserRolesRepository } from './userRoles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesEntity } from './database/entity/userRoles.entity';
import { CheckUserRoleExist } from 'src/middlewares/checkUserRoleExist.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/user-roles`;

// -------------------------------------------------------

@Module({
  imports: [TypeOrmModule.forFeature([UserRolesEntity])],
  controllers: [UserRolesController],
  providers: [UserRolesService, UserRolesRepository],
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
