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

@Injectable()
export class CheckEmailExist implements NestInterceptor {
  constructor(
    @InjectRepository(UsersEntity)
    public usersEntity: Repository<UsersEntity>,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getEmail = context.switchToHttp().getRequest().body.email;
    console.log(getEmail, 'D');
    const find = await this.usersEntity.findOneBy(getEmail);
    if (find) {
      throw new NotFoundException('Email is already exist');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
