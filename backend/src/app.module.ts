import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'orm.config';
import { VendorsModule } from './modules/vendors/vendors.module';
import { UsersStatusesModule } from './modules/usersStatuses/usersStatuses.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    VendorsModule,
    UsersStatusesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
