import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { WorkingTimeService } from './workingTime.service';
import { WorkingTimeController } from './workingTime.controller';
import { WorkingTimeRepository } from './workingTime.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingTimeEntity } from './database/entity/workingTime.entity';
import { CheckWorkingTimeExist } from 'src/middlewares/checkWorkingTimeExist.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/working-time`;

// ----------------------------------------------------

@Module({
  imports: [TypeOrmModule.forFeature([WorkingTimeEntity])],
  controllers: [WorkingTimeController],
  providers: [WorkingTimeService, WorkingTimeRepository],
})
export class WorkingTimeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckWorkingTimeExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckWorkingTimeExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckWorkingTimeExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
