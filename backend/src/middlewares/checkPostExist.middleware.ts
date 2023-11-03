import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PostsRepository } from 'src/modules/posts/posts.repository';

@Injectable()
export class CheckPostExist implements NestMiddleware {
  constructor(private readonly postsRepository: PostsRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const findUser = await this.postsRepository.getDetailPost(getId);
    if (!findUser) {
      throw new NotFoundException('Post ID is not found');
    }
    next();
  }
}
