import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserStatusesRepository } from 'src/modules/userStatuses/userStatuses.repository';

@Injectable()
export class CheckUserStatusExist implements NestMiddleware {
  constructor(private userStatusesRepository: UserStatusesRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const find = await this.userStatusesRepository.getDetailUserStatus(getId);
    if (!find) {
      throw new NotFoundException('User Status ID is not found');
    }
    next();
  }
}
