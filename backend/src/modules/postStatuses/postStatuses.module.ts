import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostStatusesService } from './postStatuses.service';
import { PostStatusesController } from './postStatuses.controller';
import { PostStatusesRepository } from './postStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostStatusesEntity } from './database/entity/postStatuses.entity';
import { CheckPostStatusExist } from 'src/middlewares/checkPostStatusExist.middleware';
import { UsersEntity } from '../users/database/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EmailService } from '../email/email.service';
import { MyGateway } from '../gateway/gateway';
const path = process.env.SERVER_PATH;
const url = `${path}/post-statuses`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([PostStatusesEntity, UsersEntity]),
    JwtModule,
  ],
  controllers: [PostStatusesController],
  providers: [
    PostStatusesService,
    PostStatusesRepository,
    UsersService,
    UsersRepository,
    CloudinaryService,
    EmailService,
    MyGateway,
  ],
})
export class PostStatusesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckPostStatusExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckPostStatusExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckPostStatusExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
