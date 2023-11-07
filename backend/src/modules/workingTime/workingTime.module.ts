import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { WorkingTimeService } from './workingTime.service';
import { WorkingTimeController } from './workingTime.controller';
import { WorkingTimeRepository } from './workingTime.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingTimeEntity } from './database/entity/workingTime.entity';
import { CheckWorkingTimeExist } from 'src/middlewares/checkWorkingTimeExist.middleware';
import { UsersEntity } from '../users/database/entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
const path = process.env.SERVER_PATH;
const url = `${path}/working-time`;

// ----------------------------------------------------

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkingTimeEntity, UsersEntity]),
    JwtModule,
  ],
  controllers: [WorkingTimeController],
  providers: [
    WorkingTimeService,
    WorkingTimeRepository,
    UsersService,
    UsersRepository,
    CloudinaryService,
    // MyGateway,
  ],
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
