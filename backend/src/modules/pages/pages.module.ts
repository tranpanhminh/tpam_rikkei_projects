import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { PagesRepository } from './pages.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesEntity } from './database/entity/pages.entity';
import { CheckPageExist } from 'src/middlewares/checkPageExist.middleware';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { PostTypesEntity } from '../postTypes/database/entity/postTypes.entity';
import { PostStatusesEntity } from '../postStatuses/database/entity/postStatuses.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

const path = process.env.SERVER_PATH;
const url = `${path}/pages`;

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PagesEntity,
      PostTypesEntity,
      PostStatusesEntity,
    ]),
    NestjsFormDataModule,
  ],
  controllers: [PagesController],
  providers: [PagesService, PagesRepository, CloudinaryService],
})
export class PagesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckPageExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckPageExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckPageExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
