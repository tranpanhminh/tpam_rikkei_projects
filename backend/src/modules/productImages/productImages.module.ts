import { Module } from '@nestjs/common';
import { ProductImagesService } from './productImages.service';
import { ProductImagesController } from './productImages.controller';
import { ProductImagesRepository } from './productImages.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImagesEntity } from './database/entity/productImages.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImagesEntity]),
    NestjsFormDataModule,
  ],
  controllers: [ProductImagesController],
  providers: [ProductImagesService, ProductImagesRepository, CloudinaryService],
})
export class ProductImagesModule {}
