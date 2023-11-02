import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ServicesRepository } from 'src/modules/services/services.repository';

@Injectable()
export class CheckServiceExist implements NestMiddleware {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const id = req.params.id;
    const find = await this.servicesRepository.getDetailService(id);
    if (!find) {
      throw new NotFoundException('Service ID is not found');
    }
    next();
  }
}
