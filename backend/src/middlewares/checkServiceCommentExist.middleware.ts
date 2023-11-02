import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ServiceCommentsRepository } from 'src/modules/serviceComments/serviceComments.repository';

@Injectable()
export class checkServiceCommentExist implements NestMiddleware {
  constructor(
    private readonly serviceCommentsRepository: ServiceCommentsRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const findComment =
      await this.serviceCommentsRepository.getDetailServiceComment(getId);
    if (!findComment) {
      throw new NotFoundException('Service Comment ID is not found');
    }
    next();
  }
}
