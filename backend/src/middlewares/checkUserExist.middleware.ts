import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class CheckUserExist implements NestMiddleware {
  constructor(private readonly usersRepository: UsersRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getUserId = req.params.userId;
    const findUser = await this.usersRepository.getDetailUser(getUserId);
    if (!findUser) {
      throw new NotFoundException('User ID is not found');
    }
    next();
  }
}
