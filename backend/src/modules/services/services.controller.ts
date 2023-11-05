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
import { ServicesService } from './services.service';
import { ConfigModule } from '@nestjs/config';
import { ServicesEntity } from './database/entity/services.entity';
import { CreateServiceDTO } from './dto/createService.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { UpdateServiceDTO } from './dto/updateService.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/services`)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // 1. Get All
  @Get()
  async getAllServices() {
    const result = await this.servicesService.getAllServices();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailService(
    @Param('id') id: number,
  ): Promise<ServicesEntity | unknown> {
    const result: ServicesEntity | unknown =
      await this.servicesService.getDetailService(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  @FormDataRequest()
  async addService(
    @Body() body: CreateServiceDTO,
  ): Promise<ServicesEntity | unknown> {
    const result: string | unknown =
      await this.servicesService.addService(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async deleteService(
    @Param('id') id: number,
  ): Promise<ServicesEntity | unknown> {
    const result: string | unknown =
      await this.servicesService.deleteService(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  @FormDataRequest()
  async updateService(
    @Param('id') id: number,
    @Body() body: UpdateServiceDTO,
  ): Promise<ServicesEntity | unknown> {
    const result = await this.servicesService.updateService(id, body);
    return result;
  }
}
