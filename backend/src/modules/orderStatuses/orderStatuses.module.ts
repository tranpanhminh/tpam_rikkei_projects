import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OrderStatusesService } from './orderStatuses.service';
import { OrderStatusesController } from './orderStatuses.controller';
import { OrderStatusesRepository } from './orderStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusesEntity } from './database/entity/orderStatuses.entity';
import { CheckOrderStatusExist } from 'src/middlewares/checkOrderStatusExist.middleware';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UsersEntity } from '../users/database/entity/users.entity';
import { EmailService } from '../email/email.service';
import { MyGateway } from '../gateway/gateway';
const path = process.env.SERVER_PATH;
const url = `${path}/order-statuses`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderStatusesEntity, UsersEntity]),
    JwtModule,
  ],
  controllers: [OrderStatusesController],
  providers: [
    OrderStatusesService,
    OrderStatusesRepository,
    UsersService,
    UsersRepository,
    CloudinaryService,
    EmailService,
    MyGateway,
  ],
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
