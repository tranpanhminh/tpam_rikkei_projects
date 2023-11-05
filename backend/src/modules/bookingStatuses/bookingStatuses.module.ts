import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BookingStatusesService } from './bookingStatuses.service';
import { BookingStatusesController } from './bookingStatuses.controller';
import { BookingStatusesRepository } from './bookingStatuses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingStatusesEntity } from './database/entity/bookingStatuses.entity';
import { CheckBookingStatusExist } from 'src/middlewares/checkBookingStatusExist.middleware';
import { BookingsEntity } from '../bookings/database/entity/bookings.entity';
import { BookingsRepository } from '../bookings/bookings.repository';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UsersModule } from '../users/users.module';
import { UsersEntity } from '../users/database/entity/users.entity';

const path = process.env.SERVER_PATH;
const url = `${path}/booking-statuses`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookingStatusesEntity,
      BookingsEntity,
      UsersEntity,
      UsersModule,
    ]),
    JwtModule,
  ],
  controllers: [BookingStatusesController],
  providers: [
    BookingStatusesService,
    BookingStatusesRepository,
    BookingsRepository,
    UsersService,
    UsersRepository,
    CloudinaryService,
  ],
})
export class BookingStatusesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckBookingStatusExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckBookingStatusExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckBookingStatusExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
