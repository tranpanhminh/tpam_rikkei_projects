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
export class CheckIfEmailIsCorrect implements NestInterceptor {
  constructor(
    @InjectRepository(UsersEntity)
    public usersEntity: Repository<UsersEntity>,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getEmail = context.switchToHttp().getRequest().body.email;
    const find = await this.usersEntity.findOne({ where: { email: getEmail } });
    if (!find) {
      throw new NotFoundException('Email is not exist');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
