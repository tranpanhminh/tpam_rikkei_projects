import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersEntity } from 'src/modules/users/database/entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
const bcrypt = require('bcryptjs');

@Injectable()
export class CheckIsOldPassword implements NestInterceptor {
  constructor(
    @InjectRepository(UsersEntity)
    public usersEntity: Repository<UsersEntity>,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const getPassword = context.switchToHttp().getRequest().body.old_password;

    const findUser = await this.usersEntity.findOne({ where: { id: getId } });
    const checkPass = await bcrypt.compare(getPassword, findUser.password);

    if (!checkPass) {
      throw new NotFoundException('Old password is wrong');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
