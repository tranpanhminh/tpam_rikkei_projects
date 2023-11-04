import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class CheckUserStatus implements NestMiddleware {
  constructor(private readonly usersRepository: UsersRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getUserId = req.params.userId;
    const findUser = await this.usersRepository.getDetailUser(getUserId);
    if (findUser.status_id == 2) {
      throw new BadRequestException(
        "You can't allowed because your account is inactive",
      );
    }
    next();
  }
}
