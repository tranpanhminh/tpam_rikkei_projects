import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ConfigModule } from '@nestjs/config';
import { ServicesEntity } from './database/entity/services.entity';

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
  // @Post("/add")
  // async addService(
  //   @Body() body: CreateServiceDTO
  // ): Promise<ServicesEntity | unknown> {
  //   const result: string | unknown = await this.servicesService.addService(
  //     body
  //   );
  //   return result;
  // }

  // 4. Delete
  // @Delete("/delete/:id")
  // @UseInterceptors(CheckServiceExist)
  // async deleteService(
  //   @Param("id") id: number
  // ): Promise<ServicesEntity | unknown> {
  //   const result: string | unknown = await this.servicesService.deleteService(
  //     id
  //   );
  //   return result;
  // }

  // 5. Update
  // @Patch("update/:id")
  // @UseInterceptors(CheckServiceExist)
  // async updateService(
  //   @Param("id") id: number,
  //   @Body() body: UpdateServiceDTO
  // ): Promise<ServicesEntity | unknown> {
  //   const result = await this.servicesService.updateService(id, body);
  //   return result;
  // }
}
