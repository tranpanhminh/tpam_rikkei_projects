/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthorizationCustomerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const getUserData = request.currentUser;
    const userRole = getUserData.user_roles.name.toLowerCase();
    if (userRole === 'customer') {
      return true;
    } else {
      throw new UnauthorizedException('Only customer is allowed');
    }
  }
}
