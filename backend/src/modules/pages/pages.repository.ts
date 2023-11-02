import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagesEntity } from './database/entity/pages.entity';

@Injectable()
export class PagesRepository {
  constructor(
    @InjectRepository(PagesEntity)
    public pagesEntity: Repository<PagesEntity>,
  ) {}

  // 1. Get All
  async getAllPages() {
    return await this.pagesEntity.find();
  }

  // 2. Get Detail
  async getDetailPage(id: number): Promise<PagesEntity> {
    const detailPage = await this.pagesEntity.findOneById(id);
    return detailPage;
  }

  // // 3. Add
  // async addPage(
  //   newPage: CreatePageDTO,
  // ): Promise<PagesEntity | unknown> {
  //   return await this.pagesEntity.save(newPage);
  // }

  // // 4. Delete
  // async deletePage(id: number): Promise<PagesEntity | unknown> {
  //   return await this.pagesEntity.delete(id);
  // }

  // // 5. Update
  // async updatePage(
  //   id: number,
  //   updatePage: UpdatePageDTO,
  // ): Promise<PagesEntity | unknown> {
  //   return await this.pagesEntity.update(id, updatePage);
  // }

  // // 6. Check Bill To Apply Page
  // async checkBillToApplyPage(bill: number): Promise<unknown> {
  //   const listCounpons = this.pagesEntity
  //     .createQueryBuilder('page')
  //     .select(['*'])
  //     .where('page.min_bill <= :bill', { bill })
  //     .orderBy('page.min_bill', 'DESC')
  //     .limit(1);
  //   const result = await listCounpons.getRawOne();
  //   return result;
  // }
}
