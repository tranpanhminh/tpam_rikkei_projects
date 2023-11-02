import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PagesRepository } from './pages.repository';
import { PagesEntity } from './database/entity/pages.entity';

@Injectable()
export class PagesService {
  constructor(private readonly pagesRepository: PagesRepository) {}

  // 1. Get All
  async getAllPages() {
    const result = await this.pagesRepository.getAllPages();
    return result;
  }

  // 2. Get Detail
  async getDetailPage(id: number): Promise<PagesEntity | unknown> {
    const detailPage: PagesEntity | unknown =
      await this.pagesRepository.getDetailPage(id);
    if (detailPage) {
      return detailPage;
    }
  }

  // // 3. Add
  // async addPage(body: CreatePageDTO): Promise<PagesEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const newPage = {
  //     name: name,
  //     code: code,
  //     discount_rate: discount_rate,
  //     min_bill: min_bill,
  //   };
  //   await this.pagesRepository.addPage(newPage);
  //   return new HttpException('Page Added', HttpStatus.OK);
  // }

  // // 4. Delete
  // async deletePage(id: number): Promise<PagesEntity | unknown> {
  //   const checkPage = await this.pagesRepository.getDetailPage(id);
  //   if (checkPage) {
  //     await this.pagesRepository.deletePage(id);
  //     return new HttpException('Page Deleted', HttpStatus.OK);
  //   }
  // }

  // // 5. Update
  // async updatePage(
  //   id: number,
  //   body: UpdatePageDTO,
  // ): Promise<PagesEntity | unknown> {
  //   const { name, code, discount_rate, min_bill } = body;
  //   const checkPage: PagesEntity =
  //     await this.pagesRepository.getDetailPage(id);
  //   if (checkPage) {
  //     const updatePage = {
  //       name: !name ? checkPage.name : name,
  //       code: !code ? checkPage.code : code,
  //       discount_rate: !discount_rate
  //         ? checkPage.discount_rate
  //         : discount_rate,
  //       min_bill: !min_bill ? checkPage.min_bill : min_bill,
  //     };
  //     await this.pagesRepository.updatePage(id, updatePage);
  //     return new HttpException('Page Updated', HttpStatus.OK);
  //   }
  // }
}
