import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Page,
  UseInterceptors,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { ConfigModule } from '@nestjs/config';
import { PagesEntity } from './database/entity/pages.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/pages`)
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  // 1. Get All
  @Get()
  async getAllPages() {
    const result = await this.pagesService.getAllPages();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  // @UseInterceptors(CheckPageExist)
  async getDetailPage(@Param('id') id: number): Promise<PagesEntity | unknown> {
    const result: PagesEntity | unknown =
      await this.pagesService.getDetailPage(id);
    return result;
  }

  // // 3. Add
  // @Page('/add')
  // async addPage(
  //   @Body() body: CreatePageDTO,
  // ): Promise<PagesEntity | unknown> {
  //   const result: string | unknown = await this.pagesService.addPage(body);
  //   return result;
  // }

  // // 4. Delete
  // @Delete('/delete/:id')
  // @UseInterceptors(CheckPageExist)
  // async deletePage(
  //   @Param('id') id: number,
  // ): Promise<PagesEntity | unknown> {
  //   const result: string | unknown = await this.pagesService.deletePage(id);
  //   return result;
  // }

  // // 5. Update
  // @Patch('update/:id')
  // @UseInterceptors(CheckPageExist)
  // async updatePage(
  //   @Param('id') id: number,
  //   @Body() body: UpdatePageDTO,
  // ): Promise<PagesEntity | unknown> {
  //   const result = await this.pagesService.updatePage(id, body);
  //   return result;
  // }
}
