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
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/modules/google/GoogleStrategy';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';
import { CheckTokenResetPasswordValid } from 'src/middlewares/checkTokenResetPasswordValid.middleware';
const path = process.env.SERVER_PATH;
const url = `${path}/users`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    NestjsFormDataModule,
    JwtModule,
    PassportModule.register({ defaultStrategy: 'google' }),
    EmailModule,
    // JwtModule.register({
    //   global: true,
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    CloudinaryService,
    JwtService,
    GoogleStrategy,
    EmailService,
    // MyGateway,
  ],
  exports: [UsersRepository],
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
    consumer.apply(CheckEmailCorrect).forRoutes({
      path: `${url}/reset-password/`,
      method: RequestMethod.POST,
    });
    consumer.apply(CheckTokenResetPasswordValid).forRoutes({
      path: `${url}/reset-password/:token`,
      method: RequestMethod.POST,
    });
  }
}
