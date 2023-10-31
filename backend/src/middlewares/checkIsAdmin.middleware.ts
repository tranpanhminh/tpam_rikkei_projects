import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class CheckIsAdmin implements NestMiddleware {
  constructor(private readonly usersRepository: UsersRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getUserId = req.params.userId;
    const findUser = await this.usersRepository.getDetailUser(getUserId);
    if (findUser.role_id == 1 || findUser.role_id == 2) {
      throw new NotAcceptableException('Admin is not allowed');
    }
    next();
  }
}
