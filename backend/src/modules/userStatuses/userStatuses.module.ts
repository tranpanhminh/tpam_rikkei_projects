import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserStatusesService } from './userStatuses.service';
import { UserStatusesController } from './userStatuses.controller';
import { UserStatusesRepository } from './userStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatusesEntity } from './database/entity/userStatuses.entity';
import { CheckUserStatusExist } from 'src/middlewares/checkUserStatusExist.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/user-statuses`;

// ----------------------------------------------------

@Module({
  imports: [TypeOrmModule.forFeature([UserStatusesEntity])],
  controllers: [UserStatusesController],
  providers: [UserStatusesService, UserStatusesRepository],
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
