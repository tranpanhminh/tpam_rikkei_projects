import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './database/entity/users.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CheckUserExist } from 'src/middlewares/checkUserExist.middleware';
import { CheckEmailExist } from 'src/middlewares/checkEmailExist.middleware';
import { CheckEmailCorrect } from 'src/middlewares/checkEmailCorrect.middleware';
import { CheckPasswordCorrect } from 'src/middlewares/checkPasswordCorrect.middleware';
import { CheckIsOldPassword } from 'src/middlewares/checkIsOldPassword.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/users`;

// -------------------------------------------------------

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), NestjsFormDataModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, CloudinaryService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckUserExist).forRoutes({
      path: `${url}/detail/:userId`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckUserExist).forRoutes({
      path: `${url}/delete/:userId`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckEmailExist).forRoutes({
      path: `${url}/create`,
      method: RequestMethod.POST,
    });
    consumer.apply(CheckEmailExist).forRoutes({
      path: `${url}/register`,
      method: RequestMethod.POST,
    });
    consumer.apply(CheckEmailCorrect, CheckPasswordCorrect).forRoutes({
      path: `${url}/login`,
      method: RequestMethod.POST,
    });
    consumer.apply(CheckEmailExist).forRoutes({
      path: `${url}/add`,
      method: RequestMethod.POST,
    });
    consumer.apply(CheckUserExist).forRoutes({
      path: `${url}/update/:userId`,
      method: RequestMethod.PATCH,
    });
    consumer.apply(CheckUserExist).forRoutes({
      path: `${url}/change-status-account/:userId`,
      method: RequestMethod.PATCH,
    });
    consumer.apply(CheckUserExist, CheckIsOldPassword).forRoutes({
      path: `${url}/change-password/:userId`,
      method: RequestMethod.PATCH,
    });
    consumer.apply(CheckUserExist).forRoutes({
      path: `${url}/edit-avatar/:userId`,
      method: RequestMethod.PATCH,
    });
  }
}
