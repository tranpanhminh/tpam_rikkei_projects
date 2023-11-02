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

const path = process.env.SERVER_PATH;
const url = `${path}/services`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicesEntity, CartsEntity]),
    NestjsFormDataModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository, CloudinaryService],
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
