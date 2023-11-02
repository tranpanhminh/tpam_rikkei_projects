import { Module } from "@nestjs/common";
import { ServiceCommentsService } from "./serviceComments.service";
import { ServiceCommentsController } from "./serviceComments.controller";
import { ServiceCommentsRepository } from "./serviceComments.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceCommentsEntity } from "./database/entity/serviceComments.entity";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { NestjsFormDataModule } from "nestjs-form-data";
import { ProductsEntity } from "../products/database/entity/products.entity";
import { ProductsRepository } from "../products/products.repository";
import { ProductImagesRepository } from "../productImages/productImages.repository";
import { ProductImagesEntity } from "../productImages/database/entity/productImages.entity";
import { UsersEntity } from "../users/database/entity/users.entity";
import { UsersRepository } from "../users/users.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceCommentsEntity,
      ProductsEntity,
      ProductImagesEntity,
      UsersEntity,
    ]),
    NestjsFormDataModule,
  ],
  controllers: [ServiceCommentsController],
  providers: [
    ServiceCommentsService,
    ServiceCommentsRepository,
    CloudinaryService,
    ProductsRepository,
    ProductImagesRepository,
    UsersRepository,
  ],
})
export class ServiceCommentsModule {}
