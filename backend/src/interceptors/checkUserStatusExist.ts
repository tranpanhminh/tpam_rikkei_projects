import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserStatusesRepository } from 'src/modules/userStatuses/userStatuses.repository';

@Injectable()
export class CheckUserStatusExist implements NestInterceptor {
  constructor(private userStatusesRepository: UserStatusesRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find = await this.userStatusesRepository.getDetailUserStatus(getId);
    if (!find) {
      throw new NotFoundException('User Status ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
