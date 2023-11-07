import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ServiceCommentsService } from './serviceComments.service';
import { ServiceCommentsController } from './serviceComments.controller';
import { ServiceCommentsRepository } from './serviceComments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCommentsEntity } from './database/entity/serviceComments.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ProductsEntity } from '../products/database/entity/products.entity';
import { ProductsRepository } from '../products/products.repository';
import { ProductImagesRepository } from '../productImages/productImages.repository';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';
import { UsersEntity } from '../users/database/entity/users.entity';
import { UsersRepository } from '../users/users.repository';
import { checkServiceCommentExist } from 'src/middlewares/checkServiceCommentExist.middleware';
import { CheckServiceExist } from 'src/middlewares/checkServiceExist.middleware.';
import { CheckUserExist } from 'src/middlewares/checkUserExist.middleware';
import { ServicesEntity } from '../services/database/entity/services.entity';
import { ServicesRepository } from '../services/services.repository';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
const path = process.env.SERVER_PATH;
const url = `${path}/comments/services`;

// -------------------------------------------------------
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceCommentsEntity,
      ProductsEntity,
      ProductImagesEntity,
      UsersEntity,
      ServicesEntity,
    ]),
    JwtModule,
    NestjsFormDataModule,
  ],
  controllers: [ServiceCommentsController],
  providers: [
    ServiceCommentsService,
    ServiceCommentsRepository,
    CloudinaryService,
    ProductsRepository,
    ProductImagesRepository,
    UsersRepository,
    ServicesRepository,
    UsersService,
    // MyGateway,
  ],
})
export class ServiceCommentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckServiceExist, CheckUserExist).forRoutes({
      path: `${url}/add/:id/users/:userId`,
      method: RequestMethod.POST,
    });
    consumer.apply(checkServiceCommentExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(checkServiceCommentExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
  }
}
