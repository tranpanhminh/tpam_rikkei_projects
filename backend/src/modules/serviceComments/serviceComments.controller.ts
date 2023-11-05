import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServiceCommentsService } from './serviceComments.service';
import { ConfigModule } from '@nestjs/config';
import { ServiceCommentsEntity } from './database/entity/serviceComments.entity';
import { CreateServiceCommentDTO } from './dto/createServiceComment.dto';
// import { CheckServiceCommentExist } from "src/pipes/checkServiceCommentExist.pipe";
// import { CheckProductAndUserExist } from "src/pipes/checkProductAndUserExist.pipe";
// import { CheckProductExist } from "src/pipes/checkProductExist.pipe";

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/comments/services`)
export class ServiceCommentsController {
  constructor(
    private readonly serviceCommentsService: ServiceCommentsService,
  ) {}

  // 1. Get All
  @Get()
  async getAllServiceComments() {
    const result = await this.serviceCommentsService.getAllServiceComments();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:commentId/')
  async getDetailServiceComment(
    @Param('commentId') commentId: number,
  ): Promise<ServiceCommentsEntity | unknown | any> {
    const result: ServiceCommentsEntity | unknown =
      await this.serviceCommentsService.getDetailServiceComment(commentId);
    return result;
  }

  // // 3. Add
  @Post('/add/:id/users/:userId')
  async addServiceComment(
    @Param() param: { id: number; userId: number },
    @Body() body: CreateServiceCommentDTO,
  ): Promise<ServiceCommentsEntity | unknown> {
    const result: string | unknown =
      await this.serviceCommentsService.addServiceComment(
        param.id,
        param.userId,
        body,
      );
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  async deleteServiceComment(
    @Param('id') id: number,
    // @Param('id', CheckServiceCommentExist) id: number,
  ): Promise<ServiceCommentsEntity | unknown> {
    const result: string | unknown =
      await this.serviceCommentsService.deleteServiceComment(id);
    return result;
  }

  // 5. Get All Comments By Service
  @Get('/:id')
  async getAllCommentsByService(
    @Param('id') id: number,
  ): Promise<ServiceCommentsEntity | unknown> {
    const result =
      await this.serviceCommentsService.getAllCommentsByService(id);
    return result;
  }
}
