import { Module } from "@nestjs/common";
import { ProductImagesService } from "./productImages.service";
import { ProductImagesController } from "./productImages.controller";
import { ProductImagesRepository } from "./productImages.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductImagesEntity } from "./database/entity/productImages.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductImagesEntity])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService, ProductImagesRepository],
})
export class ProductImagesModule {}
