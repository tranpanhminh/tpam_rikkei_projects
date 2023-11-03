import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PagesRepository } from 'src/modules/pages/pages.repository';

@Injectable()
export class CheckPageExist implements NestMiddleware {
  constructor(private readonly pagesRepository: PagesRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const findUser = await this.pagesRepository.getDetailPage(getId);
    if (!findUser) {
      throw new NotFoundException('Page ID is not found');
    }
    next();
  }
}
