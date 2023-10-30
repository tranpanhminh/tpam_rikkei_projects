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
export class CheckPassword implements NestInterceptor {
  constructor(
    @InjectRepository(UsersEntity)
    public usersEntity: Repository<UsersEntity>,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getEmail = context.switchToHttp().getRequest().params.email;
    const getPassword = context.switchToHttp().getRequest().body.password;

    const findUser = await this.usersEntity.findOne({
      where: { email: getEmail },
    });
    const checkPass = await bcrypt.compare(getPassword, findUser.password);

    if (!checkPass) {
      throw new NotFoundException('Password is not correct');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
