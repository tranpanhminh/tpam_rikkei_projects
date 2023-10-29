import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ConfigModule } from '@nestjs/config';
import { UsersEntity } from './database/entity/users.entity';
import { CheckUserExist } from 'src/interceptors/checkUserExist';
import { CheckEmailExist } from 'src/interceptors/checkEmailExist';
import { UserRegisterDTO } from './dto/register-user.dto';
import { CheckIsOldPassword } from 'src/interceptors/checkIsOldPassword';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CheckFileSize } from 'src/interceptors/checkFileSize';
import { UpdateAvatarDTO } from './dto/update-avatar.dto';
import { FormDataRequest } from 'nestjs-form-data';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/users`)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // 1. Get All
  @Get()
  async getAllUsers() {
    const result = await this.usersService.getAllUsers();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  @UseInterceptors(CheckUserExist)
  async getDetailUser(@Param('id') id: number): Promise<UsersEntity | unknown> {
    const result: UsersEntity | unknown =
      await this.usersService.getDetailUser(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  @UseInterceptors(CheckEmailExist)
  async addAdmin(@Body() body: CreateAdminDTO): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.addAdmin(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseInterceptors(CheckUserExist)
  async deleteUser(@Param('id') id: number): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.deleteUser(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseInterceptors(CheckUserExist)
  async updateUser(
    @Param('id') id: number,
    @Body() body: UpdateUserDTO,
  ): Promise<UsersEntity | unknown> {
    const result = await this.usersService.updateUser(id, body);
    return result;
  }

  // 6. Signup
  @Post('/register')
  @UseInterceptors(CheckEmailExist)
  async userRegister(
    @Body() body: UserRegisterDTO,
  ): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.userRegister(body);
    return result;
  }

  // 7. Login
  // @Post('/login')
  // @UseInterceptors(CheckEmailExist)
  // async login(@Body() body: UserRegisterDTO): Promise<UsersEntity | unknown> {
  //   const result: string | unknown = await this.usersService.userRegister(body);
  //   return result;
  // }

  // 8. Change Status User
  @Patch('/change-status-account/:id')
  @UseInterceptors(CheckUserExist)
  async changeStatus(@Param('id') id: number): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.changeStatus(id);
    return result;
  }

  // 9. Change Password
  @Patch('/change-password/:id')
  @UseInterceptors(CheckUserExist, CheckIsOldPassword)
  async changePassword(
    @Param('id') id: number,
    @Body() body: ChangePasswordDTO,
  ): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.changePassword(
      id,
      body,
    );
    return result;
  }

  // 10. Add
  @Post('/create')
  @UseInterceptors(CheckEmailExist)
  async createUser(
    @Body() body: CreateAdminDTO,
  ): Promise<UsersEntity | unknown> {
    const result: string | unknown = await this.usersService.createUser(body);
    return result;
  }

  // 11. Edit Avatar
  @Patch('/edit-avatar/:id')
  @UseInterceptors(CheckUserExist)
  @FormDataRequest()
  async editAvatar(
    // @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateAvatarDTO,
  ) {
    console.log(body.image_avatar.buffer, 'DASD');
    const file = body.image_avatar.buffer;
    const result = await this.cloudinaryService.uploadFile(file, {
      folder: 'uploads',
      use_filename: true,
    });

    return { imageUrl: result.secure_url };
  }
}
