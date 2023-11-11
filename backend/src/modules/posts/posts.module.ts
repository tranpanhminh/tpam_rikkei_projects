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
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UsersEntity } from '../users/database/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { MyGateway } from '../gateway/gateway';
const path = process.env.SERVER_PATH;
const url = `${path}/posts`;

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsEntity, PostStatusesEntity, UsersEntity]),
    JwtModule,
    NestjsFormDataModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository,
    PostStatusesRepository,
    CloudinaryService,
    UsersRepository,
    UsersService,
    EmailService,
    MyGateway,
  ],
})
export class PostsModule {
  configure(consumer: MiddlewareConsumer) {
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
