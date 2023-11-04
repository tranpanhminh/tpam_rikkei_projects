import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PostTypesRepository } from 'src/modules/postTypes/postTypes.repository';

@Injectable()
export class CheckPostTypeExist implements NestMiddleware {
  constructor(private readonly postTypesRepository: PostTypesRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const findUser = await this.postTypesRepository.getDetailPostType(getId);
    if (!findUser) {
      throw new NotFoundException('Post Type ID is not found');
    }
    next();
  }
}
