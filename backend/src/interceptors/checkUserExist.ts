import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersRepository } from './../modules/users/users.repository';

@Injectable()
export class CheckUserExist implements NestInterceptor {
  constructor(private usersRepository: UsersRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find = await this.usersRepository.getDetailUser(getId);
    if (!find) {
      throw new NotFoundException('User ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
