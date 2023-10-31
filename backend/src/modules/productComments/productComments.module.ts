import { Module } from '@nestjs/common';
import { ProductCommentsService } from './productComments.service';
import { ProductCommentsController } from './productComments.controller';
import { ProductCommentsRepository } from './productComments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCommentsEntity } from './database/entity/productComments.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ProductsEntity } from '../products/database/entity/products.entity';
import { ProductsRepository } from '../products/products.repository';
import { ProductImagesRepository } from '../productImages/productImages.repository';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';
import { UsersEntity } from '../users/database/entity/users.entity';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCommentsEntity,
      ProductsEntity,
      ProductImagesEntity,
      UsersEntity,
    ]),
    NestjsFormDataModule,
  ],
  controllers: [ProductCommentsController],
  providers: [
    ProductCommentsService,
    ProductCommentsRepository,
    CloudinaryService,
    ProductsRepository,
    ProductImagesRepository,
    UsersRepository,
  ],
})
export class ProductCommentsModule {}
