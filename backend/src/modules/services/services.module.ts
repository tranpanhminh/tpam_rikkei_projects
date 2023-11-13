import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServicesRepository } from './services.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesEntity } from './database/entity/services.entity';
import { CartsEntity } from '../carts/database/entity/carts.entity';
import { CheckServiceExist } from 'src/middlewares/checkServiceExist.middleware.';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UsersEntity } from '../users/database/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { EmailService } from '../email/email.service';
// import { MyGateway } from '../gateway/gateway';
const path = process.env.SERVER_PATH;
const url = `${path}/services`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicesEntity, CartsEntity, UsersEntity]),
    JwtModule,
    NestjsFormDataModule,
  ],
  controllers: [ServicesController],
  providers: [
    ServicesService,
    ServicesRepository,
    CloudinaryService,
    UsersService,
    UsersRepository,
    EmailService,
    // MyGateway,
  ],
})
export class ServicesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckServiceExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckServiceExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckServiceExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
