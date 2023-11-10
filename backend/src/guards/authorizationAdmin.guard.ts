/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AuthorizationAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const getUserData = request.currentUser;
    const userRole = getUserData.user_roles.name.toLowerCase();
    if (userRole === 'admin' || userRole === 'super admin') {
      return true;
    } else {
      throw new UnauthorizedException('Only admin is allowed');
    }
  }
}
