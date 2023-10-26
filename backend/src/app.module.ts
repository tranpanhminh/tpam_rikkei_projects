import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'orm.config';
import { VendorsModule } from './modules/vendors/vendors.module';
@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), VendorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
