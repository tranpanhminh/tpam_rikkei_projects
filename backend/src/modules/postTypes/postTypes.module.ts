import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostTypesService } from './postTypes.service';
import { PostTypesController } from './postTypes.controller';
import { PostTypesRepository } from './postTypes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTypesEntity } from './database/entity/postTypes.entity';
import { CheckPostTypeExist } from 'src/middlewares/checkPostTypeExist.middleware';
import { UsersEntity } from '../users/database/entity/users.entity';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtModule } from '@nestjs/jwt';
const path = process.env.SERVER_PATH;
const url = `${path}/post-types`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([PostTypesEntity, UsersEntity]),
    JwtModule,
  ],
  controllers: [PostTypesController],
  providers: [
    PostTypesService,
    PostTypesRepository,
    UsersRepository,
    UsersService,
    CloudinaryService,
    // MyGateway,
  ],
})
export class PostTypesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckPostTypeExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckPostTypeExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckPostTypeExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
