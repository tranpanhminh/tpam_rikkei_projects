import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { UsersEntity } from 'src/modules/users/database/entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction } from 'express';

@Injectable()
export class CheckEmailCorrect implements NestMiddleware {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersEntity: Repository<UsersEntity>,
  ) {}

  async use(req: any, res: Response, next: NextFunction): Promise<any> {
    const getEmail = req.body.email;
    const find = await this.usersEntity.findOne({ where: { email: getEmail } });
    if (!find) {
      throw new NotFoundException('Email is not exist');
    }

    next();
  }
}
