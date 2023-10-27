import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'orm.config';
import { VendorsModule } from './modules/vendors/vendors.module';
import { UsersStatusesModule } from './modules/usersStatuses/usersStatuses.module';
import { PostsStatusesModule } from './modules/postsStatuses/postsStatuses.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    VendorsModule,
    UsersStatusesModule,
    PostsStatusesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
