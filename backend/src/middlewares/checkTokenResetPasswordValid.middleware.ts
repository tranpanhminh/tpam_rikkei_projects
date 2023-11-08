import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class CheckTokenResetPasswordValid implements NestMiddleware {
  constructor(private readonly usersRepository: UsersRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getToken = req.params.token;
    const user =
      await this.usersRepository.getDetailUserByTokenResetPassword(getToken);
    if (!user) {
      throw new NotAcceptableException('Token is not valid');
    }
    next();
  }
}
