import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PostStatusesRepository } from 'src/modules/postStatuses/postStatuses.repository';

@Injectable()
export class CheckPostStatusExist implements NestMiddleware {
  constructor(
    private readonly postStatusesRepository: PostStatusesRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
 console.log(req)
    const statusId = req.body.status_id;
    console.log(statusId);
    const getAll = await this.postStatusesRepository.getAllPostStatuses();
    const allStatuses = getAll.map((status) => {
      return status.id;
    });
    if (!allStatuses.includes(statusId)) {
      throw new NotFoundException('Invalid Status');
    }

    next();
  }
}
