import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EmailService } from '../email/email.service';
import { UsersEntity } from '../users/database/entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [
    MyGateway,
    UsersService,
    JwtService,
    UsersRepository,
    CloudinaryService,
    EmailService,
  ],
  exports: [MyGateway],
})
export class MyGatewayModule {}
