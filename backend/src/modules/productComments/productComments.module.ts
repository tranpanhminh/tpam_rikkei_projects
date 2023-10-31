import { Module } from "@nestjs/common";
import { ProductCommentsService } from "./productComments.service";
import { ProductCommentsController } from "./productComments.controller";
import { ProductCommentsRepository } from "./productComments.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCommentsEntity } from "./database/entity/productComments.entity";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { NestjsFormDataModule } from "nestjs-form-data";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCommentsEntity]),
    NestjsFormDataModule,
  ],
  controllers: [ProductCommentsController],
  providers: [
    ProductCommentsService,
    ProductCommentsRepository,
    CloudinaryService,
  ],
})
export class ProductCommentsModule {}
