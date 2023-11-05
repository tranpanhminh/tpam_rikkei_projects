import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserStatusesService } from './userStatuses.service';
import { UserStatusesController } from './userStatuses.controller';
import { UserStatusesRepository } from './userStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatusesEntity } from './database/entity/userStatuses.entity';
import { CheckUserStatusExist } from 'src/middlewares/checkUserStatusExist.middleware';
import { UsersEntity } from '../users/database/entity/users.entity';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

const path = process.env.SERVER_PATH;
const url = `${path}/user-statuses`;

// ----------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStatusesEntity, UsersEntity]),
    JwtModule,
  ],
  controllers: [UserStatusesController],
  providers: [
    UserStatusesService,
    UserStatusesRepository,
    UsersRepository,
    UsersService,
    CloudinaryService,
  ],
})
export class UserStatusesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserStatusExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckUserStatusExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckUserStatusExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.DELETE,
    });
  }
}
