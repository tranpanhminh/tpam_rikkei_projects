import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { CouponsRepository } from './coupons.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponsEntity } from './database/entity/coupons.entity';
import { CartsEntity } from '../carts/database/entity/carts.entity';
import { CheckCouponExist } from 'src/middlewares/checkCouponExist.middleware';
import { UsersEntity } from '../users/database/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UsersService } from './../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { EmailService } from '../email/email.service';
// import { MyGateway } from '../gateway/gateway';
const path = process.env.SERVER_PATH;
const url = `${path}/coupons`;

// -------------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([CouponsEntity, CartsEntity, UsersEntity]),
    JwtModule,
  ],
  controllers: [CouponsController],
  providers: [
    CouponsService,
    CouponsRepository,
    UsersService,
    UsersRepository,
    CloudinaryService,
    EmailService,
    // MyGateway,
  ],
})
export class CouponsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckCouponExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckCouponExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckCouponExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
