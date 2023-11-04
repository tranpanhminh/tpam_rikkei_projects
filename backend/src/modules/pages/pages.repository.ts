import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagesEntity } from './database/entity/pages.entity';
import { PagesInterface } from './interface/pages.interface';

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

  // 3. Add
  async addPage(newPage: PagesInterface): Promise<PagesEntity | unknown> {
    return await this.pagesEntity.save(newPage);
  }

  // 4. Delete
  async deletePage(id: number): Promise<PagesEntity | unknown> {
    return await this.pagesEntity.delete(id);
  }

  // 5. Update
  async updatePage(
    id: number,
    updatePage: PagesInterface,
  ): Promise<PagesEntity | unknown> {
    return await this.pagesEntity.update(id, updatePage);
  }
}
