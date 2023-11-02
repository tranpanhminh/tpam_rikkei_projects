import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction } from 'express';
import { UsersEntity } from 'src/modules/users/database/entity/users.entity';
import { Repository } from 'typeorm';
const bcrypt = require('bcryptjs');

@Injectable()
export class CheckIsOldPassword implements NestMiddleware {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersEntity: Repository<UsersEntity>,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.userId;
    const getPassword = req.body.old_password;

    const findUser = await this.usersEntity.findOne({ where: { id: getId } });
    const checkPass = await bcrypt.compare(getPassword, findUser.password);

    if (!checkPass) {
      throw new BadRequestException('Old password is wrong');
    }
    next();
  }
}
