import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WorkingTimeRepository } from 'src/modules/workingTime/workingTime.repository';

@Injectable()
export class CheckWorkingTimeExist implements NestInterceptor {
  constructor(private workingTimeRepository: WorkingTimeRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find = await this.workingTimeRepository.getDetailWorkingTime(getId);
    if (!find) {
      throw new NotFoundException('Working Time ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
