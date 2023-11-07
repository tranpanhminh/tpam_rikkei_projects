/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersInterface } from 'src/modules/users/interface/users.interface';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      // 1. Get Token From Header
      const token = request.headers.authorization.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException();
      }
      console.log(token);
      // 2. Verify validate token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      // 3. File User in db based on jwtVerify
      const user: UsersInterface = await this.userService.getDetailUser(
        payload.id,
      );
      if (!user) {
        throw new BadRequestException('User not belong to token');
      }
      const { password, ...dataUser } = user;
      request.currentUser = dataUser;
    } catch (error) {
      throw new ForbiddenException('Invalid token or expired');
    }
    return true;
  }
}
