import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostStatusesService } from './postStatuses.service';
import { PostStatusesController } from './postStatuses.controller';
import { PostStatusesRepository } from './postStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostStatusesEntity } from './database/entity/postStatuses.entity';
import { CheckPostStatusExist } from 'src/middlewares/checkPostStatusExist.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/post-statuses`;

// -------------------------------------------------------

@Module({
  imports: [TypeOrmModule.forFeature([PostStatusesEntity])],
  controllers: [PostStatusesController],
  providers: [PostStatusesService, PostStatusesRepository],
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
