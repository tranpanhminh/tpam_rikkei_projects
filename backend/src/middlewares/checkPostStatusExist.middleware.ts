import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PostStatusesRepository } from 'src/modules/postStatuses/postStatuses.repository';

@Injectable()
export class CheckPostStatusExist implements NestMiddleware {
  constructor(
    private readonly postStatusesRepository: PostStatusesRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const getAll = await this.postStatusesRepository.getAllPostStatuses();
    const list = getAll.map((item) => {
      return item.id.toString();
    });
    if (!list.includes(getId)) {
      throw new NotFoundException('Post Status ID is not found');
    }
    next();
  }
}
