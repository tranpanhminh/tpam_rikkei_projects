import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsEntity } from './database/entity/bookings.entity';
import { CartsEntity } from '../carts/database/entity/carts.entity';
import { ServicesEntity } from '../services/database/entity/services.entity';
import { ServicesRepository } from '../services/services.repository';
import { CheckBookingExist } from 'src/middlewares/checkBookingExist.middleware';
import { CheckUserExist } from 'src/middlewares/checkUserExist.middleware';
import { CheckIsAdmin } from 'src/middlewares/checkIsAdmin.middleware';
import { CheckServiceExist } from 'src/middlewares/checkServiceExist.middleware.';
import { UsersEntity } from '../users/database/entity/users.entity';
import { UsersRepository } from '../users/users.repository';
import { CheckUserStatus } from 'src/middlewares/checkUserStatus.middleware';
import { CheckBookingDate } from 'src/middlewares/checkBookingDate.middleware';
import { CheckBookingBooked } from 'src/middlewares/checkBookingBooked.middleware';
import { CheckkBookingAvailable } from 'src/middlewares/checkBookingAvailable.middleware';
import { CheckBookingStatusBeforeCancel } from 'src/middlewares/checkBookingStatusBeforeCancel.middleware';
import { CheckBookingStatusAcceptForAdmin } from 'src/middlewares/checkBookingStatusAcceptForAdmin.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/bookings`;

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookingsEntity,
      CartsEntity,
      ServicesEntity,
      UsersEntity,
    ]),
  ],
  controllers: [BookingsController],
  providers: [
    BookingsService,
    BookingsRepository,
    ServicesRepository,
    UsersRepository,
  ],
})
export class BookingsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckBookingExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer
      .apply(
        CheckUserExist,
        CheckIsAdmin,
        CheckServiceExist,
        CheckUserStatus,
        CheckBookingDate,
        CheckBookingBooked,
        CheckkBookingAvailable,
      )
      .forRoutes({
        path: `${url}/add/users/:userId/services/:id`,
        method: RequestMethod.POST,
      });
    consumer.apply(CheckUserExist).forRoutes({
      path: `${url}/filter/:userId`,
      method: RequestMethod.GET,
    });
    consumer
      .apply(CheckBookingExist, CheckBookingStatusBeforeCancel)
      .forRoutes({
        path: `${url}/cancel-booking/:id`,
        method: RequestMethod.PATCH,
      });
    consumer
      .apply(CheckBookingExist, CheckBookingStatusAcceptForAdmin)
      .forRoutes({
        path: `${url}/update/:id`,
        method: RequestMethod.PATCH,
      });
  }
}
