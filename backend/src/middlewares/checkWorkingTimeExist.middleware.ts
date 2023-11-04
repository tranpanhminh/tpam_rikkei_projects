import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { WorkingTimeRepository } from 'src/modules/workingTime/workingTime.repository';

@Injectable()
export class CheckWorkingTimeExist implements NestMiddleware {
  constructor(private workingTimeRepository: WorkingTimeRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const getAll = await this.workingTimeRepository.getAllWorkingTime();
    const list = getAll.map((item) => {
      return item.id.toString();
    });
    if (!list.includes(getId)) {
      throw new NotFoundException('Working Time ID is not found');
    }
    next();
  }
}
