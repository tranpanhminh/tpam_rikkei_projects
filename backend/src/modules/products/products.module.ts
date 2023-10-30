import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsEntity } from "./database/entity/products.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
