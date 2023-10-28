import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserRolesRepository } from 'src/modules/userRoles/userRoles.repository';

@Injectable()
export class checkUserRoleExist implements NestInterceptor {
  constructor(private userRolesRepository: UserRolesRepository) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const getId = context.switchToHttp().getRequest().params.id;
    const find = await this.userRolesRepository.getDetailUserRole(getId);
    if (!find) {
      console.log(new NotFoundException());
      throw new NotFoundException('User Role ID is not found');
    }
    return next.handle().pipe(
      catchError((error) => {
        // Handle any other errors that might occur
        return throwError(error);
      }),
    );
  }
}
