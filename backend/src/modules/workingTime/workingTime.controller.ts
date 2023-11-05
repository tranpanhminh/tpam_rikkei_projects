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
import { WorkingTimeService } from './workingTime.service';
import { CreateWorkingTimeDTO } from './dto/createWorkingTime';
import { UpdateWorkingTimeDTO } from './dto/updateWorkingTime';
import { ConfigModule } from '@nestjs/config';
import { WorkingTimeEntity } from './database/entity/workingTime.entity';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationAdminGuard } from 'src/guards/authorizationAdmin.guard';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/working-time`)
export class WorkingTimeController {
  constructor(private readonly workingTimeService: WorkingTimeService) {}

  // 1. Get All
  @Get()
  async getAllWorkingTime() {
    const result = await this.workingTimeService.getAllWorkingTime();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailWorkingTime(
    @Param('id') id: number,
  ): Promise<WorkingTimeEntity | unknown> {
    const result: WorkingTimeEntity | unknown =
      await this.workingTimeService.getDetailWorkingTime(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async addWorkingTime(
    @Body() body: CreateWorkingTimeDTO,
  ): Promise<WorkingTimeEntity | unknown> {
    const result: string | unknown =
      await this.workingTimeService.addWorkingTime(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async deleteWorkingTime(
    @Param('id') id: number,
  ): Promise<WorkingTimeEntity | unknown> {
    const result: string | unknown =
      await this.workingTimeService.deleteWorkingTime(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseGuards(AuthenticationGuard, AuthorizationAdminGuard)
  async updateWorkingTime(
    @Param('id') id: number,
    @Body() body: UpdateWorkingTimeDTO,
  ): Promise<WorkingTimeEntity | unknown> {
    const result = await this.workingTimeService.updateWorkingTime(id, body);
    return result;
  }
}
