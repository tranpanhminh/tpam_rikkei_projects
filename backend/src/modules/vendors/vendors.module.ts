import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { VendorsRepository } from './vendors.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsEntity } from './database/entity/vendors.entity';
import { CheckVendorExist } from 'src/middlewares/checkVendorExist.middleware';

const path = process.env.SERVER_PATH;
const url = `${path}/vendors`;

// ----------------------------------------------------

@Module({
  imports: [TypeOrmModule.forFeature([VendorsEntity])],
  controllers: [VendorsController],
  providers: [VendorsService, VendorsRepository],
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
