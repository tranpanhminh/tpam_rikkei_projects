import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ProductCommentsService } from './productComments.service';
import { ConfigModule } from '@nestjs/config';
import { ProductCommentsEntity } from './database/entity/productComments.entity';
import { CheckProductCommentExist } from 'src/pipes/checkProductCommentExist.pipe';
import { CreateProductCommentDTO } from './dto/create-product-comment.dto';
import { CheckBeforeAddProductComment } from 'src/pipes/checkBeforeAddProductComment.pipe';
import { CheckProductExist } from 'src/pipes/checkProductExist.pipe';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/comments/products/`)
export class ProductCommentsController {
  constructor(
    private readonly productCommentsService: ProductCommentsService,
  ) {}

  // 1. Get All
  @Get()
  async getAllProductComments() {
    const result = await this.productCommentsService.getAllProductComments();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:commentId/')
  @UsePipes(CheckProductCommentExist)
  async getDetailProductComment(
    @Param('commentId') commentId: number,
  ): Promise<ProductCommentsEntity | unknown | any> {
    const result: ProductCommentsEntity | unknown =
      await this.productCommentsService.getDetailProductComment(commentId);
    return result;
  }

  // // 3. Add
  @Post('/add/:id/users/:userId')
  async addProductComment(
    @Param(CheckBeforeAddProductComment) param: { id: number; userId: number },
    @Body() body: CreateProductCommentDTO,
  ): Promise<ProductCommentsEntity | unknown> {
    const result: string | unknown =
      await this.productCommentsService.addProductComment(
        param.id,
        param.userId,
        body,
      );
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UsePipes(CheckProductCommentExist)
  async deleteProductComment(
    @Param('id') id: number,
    // @Param('id', CheckProductCommentExist) id: number,
  ): Promise<ProductCommentsEntity | unknown> {
    const result: string | unknown =
      await this.productCommentsService.deleteProductComment(id);
    return result;
  }

  // // 5. Get All Comments By Product
  @Get('/:id')
  @UsePipes(CheckProductExist)
  async getAllCommentsByProduct(
    @Param('id') id: number,
  ): Promise<ProductCommentsEntity | unknown> {
    const result =
      await this.productCommentsService.getAllCommentsByProduct(id);
    return result;
  }
}
