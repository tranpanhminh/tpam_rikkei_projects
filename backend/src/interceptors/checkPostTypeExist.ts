import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostTypesRepository } from 'src/modules/postTypes/postTypes.repository';

@Injectable()
export class CheckPostTypeExist implements NestInterceptor {
  constructor(private postTypesRepository: PostTypesRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find = await this.postTypesRepository.getDetailPostType(getId);
    if (!find) {
      throw new NotFoundException('Post Type ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
