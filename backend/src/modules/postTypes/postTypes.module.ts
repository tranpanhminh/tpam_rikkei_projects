import { Module } from "@nestjs/common";
import { PostTypesService } from "./postTypes.service";
import { PostTypesController } from "./postTypes.controller";
import { PostTypesRepository } from "./postTypes.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostTypesEntity } from "./database/entity/postTypes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostTypesEntity])],
  controllers: [PostTypesController],
  providers: [PostTypesService, PostTypesRepository],
})
export class PostTypesModule {}
