import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './database/entity/posts.entity';
import { PostStatusesEntity } from '../postStatuses/database/entity/postStatuses.entity';
import { CheckPostExist } from 'src/middlewares/checkPostExist.middleware';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { PostStatusesRepository } from '../postStatuses/postStatuses.repository';
import { CheckPostStatusExist } from 'src/middlewares/checkPostStatusExist.middleware';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

const path = process.env.SERVER_PATH;
const url = `${path}/posts`;

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsEntity, PostStatusesEntity]),
    NestjsFormDataModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
    PostStatusesRepository,
    CloudinaryService,
  ],
})
export class PostsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckPostStatusExist).forRoutes({
      path: `${url}/add`,
      method: RequestMethod.POST,
    });
    consumer.apply(CheckPostExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckPostExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckPostExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
