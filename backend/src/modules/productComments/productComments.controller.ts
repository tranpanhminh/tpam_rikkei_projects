import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ProductCommentsService } from './productComments.service';
import { ConfigModule } from '@nestjs/config';
import { ProductCommentsEntity } from './database/entity/productComments.entity';
import { CheckProductCommentExist } from 'src/pipes/checkProductCommentExist.pipe';
import { CreateProductCommentDTO } from './dto/create-product-comment.dto';
import { CheckBeforeAddProductComment } from 'src/pipes/checkBeforeAddProductComment.pipe';

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
  @UsePipes(CheckBeforeAddProductComment)
  async addProductComment(
    @Param() param,
    @Body() body: CreateProductCommentDTO,
  ): Promise<ProductCommentsEntity | unknown | any> {
    console.log(param, body);
    // const result: string | unknown =
    //   await this.productCommentsService.addProductComment(
    //     param.id,
    //     param.userId,
    //     body,
    //   );
    // return result;
  }

  // // 4. Delete
  // @Delete("/delete/:id")
  // @UseInterceptors(CheckProductCommentExist)
  // async deleteProductComment(
  //   @Param("id") id: number
  // ): Promise<ProductCommentsEntity | unknown> {
  //   const result: string | unknown =
  //     await this.productCommentsService.deleteProductComment(id);
  //   return result;
  // }

  // // 5. Update
  // @Patch("update/:id")
  // @UseInterceptors(CheckProductCommentExist)
  // async updateProductComment(
  //   @Param("id") id: number,
  //   @Body() body: UpdateProductCommentDTO
  // ): Promise<ProductCommentsEntity | unknown> {
  //   const result = await this.productCommentsService.updateProductComment(id, body);
  //   return result;
  // }
}
