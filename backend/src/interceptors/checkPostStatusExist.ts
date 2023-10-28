import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostStatusesRepository } from 'src/modules/postStatuses/postStatuses.repository';

@Injectable()
export class CheckUserStatusExist implements NestInterceptor {
  constructor(private postStatusesRepository: PostStatusesRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find = await this.postStatusesRepository.getDetailPostStatus(getId);
    if (!find) {
      throw new NotFoundException('Post Status ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
