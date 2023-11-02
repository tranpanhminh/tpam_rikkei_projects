import { Module } from "@nestjs/common";
import { PagesService } from "./pages.service";
import { PagesController } from "./pages.controller";
import { PagesRepository } from "./pages.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PagesEntity } from "./database/entity/pages.entity";
import { CartsEntity } from "../carts/database/entity/carts.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PagesEntity, CartsEntity])],
  controllers: [PagesController],
  providers: [PagesService, PagesRepository],
})
export class PagesModule {}
