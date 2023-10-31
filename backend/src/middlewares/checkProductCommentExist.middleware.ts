import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ProductCommentsRepository } from 'src/modules/productComments/productComments.repository';

@Injectable()
export class CheckProductCommentExist implements NestMiddleware {
  constructor(
    private readonly productCommentsRepository: ProductCommentsRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.commentId;
    const find =
      await this.productCommentsRepository.getDetailProductComment(getId);

    if (!find) {
      throw new NotFoundException('Product Comment ID is not found');
    }
    next();
  }
}
