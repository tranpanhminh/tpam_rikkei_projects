import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PagesRepository } from './pages.repository';
import { PagesEntity } from './database/entity/pages.entity';
import { PagesInterface } from './interface/pages.interface';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { CreatePageDTO } from './dto/createPage.dto';
import { UpdatePageDTO } from './dto/updatePage.dto';
import { extractPublicId } from 'cloudinary-build-url';
const cloudinary = require('cloudinary').v2;

@Injectable()
export class PagesService {
  constructor(
    private readonly pagesRepository: PagesRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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

  // 3. Add
  async addPage(body: CreatePageDTO): Promise<PagesEntity | unknown> {
    const { title, content, author, status_id } = body;
    const fileUpload: any = body.thumbnail_url;
    const file = await this.cloudinaryService.uploadFile(fileUpload);
    const newPage: PagesInterface = {
      title: title,
      content: content,
      thumbnail_url: file.secure_url,
      author: author,
      status_id: status_id,
      post_type_id: 4,
    };
    await this.pagesRepository.addPage(newPage);
    return new HttpException('Page Added', HttpStatus.OK);
  }

  // 4. Delete
  async deletePage(id: number): Promise<PagesEntity | unknown> {
    const checkPage = await this.pagesRepository.getDetailPage(id);
    if (checkPage) {
      const publicId = extractPublicId(checkPage.thumbnail_url);
      await cloudinary.api.delete_resources(publicId);
      await this.pagesRepository.deletePage(id);
      return new HttpException('Page Deleted', HttpStatus.OK);
    }
  }

  // 5. Update
  async updatePage(
    id: number,
    body: UpdatePageDTO,
  ): Promise<PagesEntity | unknown> {
    const { title, content, author, status_id } = body;
    const checkPage = await this.pagesRepository.getDetailPage(id);

    console.log(checkPage);
    if (body.thumbnail_url) {
      const fileUpload: any = body.thumbnail_url;
      const file = await this.cloudinaryService.uploadFile(fileUpload);
      const updatePage: PagesInterface = {
        title: !title ? checkPage.title : title,
        content: !content ? checkPage.content : content,
        thumbnail_url: file.secure_url,
        author: !author ? checkPage.author : author,
        status_id: !status_id ? checkPage.status_id : status_id,
        post_type_id: 4,
      };

      // Xóa ảnh cũ
      const publicId = extractPublicId(checkPage.thumbnail_url);
      await cloudinary.api.delete_resources(publicId);
      await this.pagesRepository.updatePage(id, updatePage);
      return new HttpException('Page Updated', HttpStatus.OK);
    } else {
      const updatePage: PagesInterface = {
        title: !title ? checkPage.title : title,
        content: !content ? checkPage.content : content,
        thumbnail_url: checkPage.thumbnail_url,
        author: !author ? checkPage.author : author,
        status_id: !status_id ? checkPage.status_id : status_id,
        post_type_id: 4,
      };

      // Xóa ảnh cũ
      const publicId = extractPublicId(checkPage.thumbnail_url);
      await cloudinary.api.delete_resources(publicId);
      await this.pagesRepository.updatePage(id, updatePage);
      return new HttpException('Page Updated', HttpStatus.OK);
    }
  }
}
