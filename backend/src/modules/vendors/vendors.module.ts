import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { VendorsRepository } from './vendors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsEntity } from './database/entity/vendors.entity';
import { CheckVendorExist } from 'src/middlewares/checkVendorExist.middleware';
import { UsersEntity } from '../users/database/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EmailService } from '../email/email.service';
const path = process.env.SERVER_PATH;
const url = `${path}/vendors`;

// ----------------------------------------------------

@Module({
  imports: [TypeOrmModule.forFeature([VendorsEntity, UsersEntity]), JwtModule],
  controllers: [VendorsController],
  providers: [
    VendorsService,
    VendorsRepository,
    UsersService,
    UsersRepository,
    CloudinaryService,
    EmailService,
    // MyGateway,
  ],
})
export class VendorsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckVendorExist).forRoutes({
      path: `${url}/detail/:id`,
      method: RequestMethod.GET,
    });
    consumer.apply(CheckVendorExist).forRoutes({
      path: `${url}/delete/:id`,
      method: RequestMethod.DELETE,
    });
    consumer.apply(CheckVendorExist).forRoutes({
      path: `${url}/update/:id`,
      method: RequestMethod.PATCH,
    });
  }
}
