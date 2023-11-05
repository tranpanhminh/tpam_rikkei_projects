import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRolesService } from './userRoles.service';
import { CreateUserRoleDTO } from './dto/create-userRole.dto';
import { UpdateUserRoleDTO } from './dto/update-userRole.dto';
import { ConfigModule } from '@nestjs/config';
import { UserRolesEntity } from './database/entity/userRoles.entity';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/user-roles`)
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  // 1. Get All
  @Get()
  async getAllUserRoles() {
    const result = await this.userRolesService.getAllUserRoles();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailUserRole(
    @Param('id') id: number,
  ): Promise<UserRolesEntity | unknown> {
    const result: UserRolesEntity | unknown =
      await this.userRolesService.getDetailUserRole(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async addUserRole(
    @Body() body: CreateUserRoleDTO,
  ): Promise<UserRolesEntity | unknown> {
    const result: string | unknown =
      await this.userRolesService.addUserRole(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async deleteUserRole(
    @Param('id') id: number,
  ): Promise<UserRolesEntity | unknown> {
    const result: string | unknown =
      await this.userRolesService.deleteUserRole(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async updateUserRole(
    @Param('id') id: number,
    @Body() body: UpdateUserRoleDTO,
  ): Promise<UserRolesEntity | unknown> {
    const result = await this.userRolesService.updateUserRole(id, body);
    return result;
  }
}
