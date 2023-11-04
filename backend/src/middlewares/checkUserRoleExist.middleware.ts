import { Injectable, NotFoundException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserRolesRepository } from 'src/modules/userRoles/userRoles.repository';

@Injectable()
export class CheckUserRoleExist implements NestMiddleware {
  constructor(private userRolesRepository: UserRolesRepository) {}

  async use(req: any, res: Response, next: NextFunction) {
    const getId = req.params.id;
    const find = await this.userRolesRepository.getDetailUserRole(getId);
    if (!find) {
      throw new NotFoundException('User Role ID is not found');
    }
    next();
  }
}
