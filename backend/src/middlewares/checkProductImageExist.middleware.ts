import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ProductImagesRepository } from 'src/modules/productImages/productImages.repository';

@Injectable()
export class CheckProductImageExist implements NestMiddleware {
  constructor(
    private readonly productImagesRepository: ProductImagesRepository,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const id = req.params.imageId;
    const find = await this.productImagesRepository.getDetailProductImage(id);
    if (!find) {
      throw new NotFoundException('Product Image ID is not found');
    }
    next();
  }
}
