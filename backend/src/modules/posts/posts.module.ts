import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsEntity } from "./database/entity/posts.entity";
import { CartsEntity } from "../carts/database/entity/carts.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity, CartsEntity])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
