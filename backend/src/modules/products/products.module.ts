import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './database/entity/products.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductImagesEntity } from '../productImages/database/entity/productImages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity]),
    NestjsFormDataModule,
    TypeOrmModule.forFeature([ProductImagesEntity]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, CloudinaryService],
})
export class ProductsModule {}
