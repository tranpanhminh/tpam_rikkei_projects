import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OrderStatusesService } from './orderStatuses.service';
import { OrderStatusesController } from './orderStatuses.controller';
import { OrderStatusesRepository } from './orderStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusesEntity } from './database/entity/orderStatuses.entity';
import { CheckOrderStatusExist } from 'src/middlewares/checkOrderStatusExist.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/order-statuses`;

// -------------------------------------------------------

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusesEntity])],
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService, OrderStatusesRepository],
})
export class OrderStatusesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckOrderStatusExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckOrderStatusExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckOrderStatusExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
