import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { UsersEntity } from 'src/modules/users/database/entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction } from 'express';
const bcrypt = require('bcryptjs');

@Injectable()
export class CheckPasswordCorrect implements NestMiddleware {
  constructor(
    @InjectRepository(UsersEntity)
    public usersEntity: Repository<UsersEntity>,
  ) {}

  async use(req: any, res: Response, next: NextFunction): Promise<any> {
    const getEmail = req.body.email;
    const getPassword = req.body.password;
    const findUser = await this.usersEntity.findOne({
      where: { email: getEmail },
    });
    const checkPass = await bcrypt.compare(getPassword, findUser.password);
    if (!checkPass) {
      throw new NotFoundException('Password is not correct');
    }

    next();
  }
}
