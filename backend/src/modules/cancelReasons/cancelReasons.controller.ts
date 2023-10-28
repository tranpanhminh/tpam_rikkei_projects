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
import { CancelReasonsService } from './cancelReasons.service';
import { CreateCancelReasonDTO } from './dto/create-cancelReason.dto';
import { UpdateCancelReasonDTO } from './dto/update-cancelReason.dto';
import { ConfigModule } from '@nestjs/config';
import { CancelReasonsEntity } from './database/entity/cancelReasons.entity';
import { CheckCancelReasonExist } from 'src/interceptors/checkCancelReasonExist';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/cancel-reasons`)
export class CancelReasonsController {
  constructor(private readonly cancelReasonsService: CancelReasonsService) {}

  // 1. Get All
  @Get()
  async getAllCancelReasons() {
    const result = await this.cancelReasonsService.getAllCancelReasons();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  @UseInterceptors(CheckCancelReasonExist)
  async getDetailCancelReason(
    @Param('id') id: number,
  ): Promise<CancelReasonsEntity | unknown> {
    const result: CancelReasonsEntity | unknown =
      await this.cancelReasonsService.getDetailCancelReason(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addCancelReason(
    @Body() body: CreateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    const result: string | unknown =
      await this.cancelReasonsService.addCancelReason(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  @UseInterceptors(CheckCancelReasonExist)
  async deleteCancelReason(
    @Param('id') id: number,
  ): Promise<CancelReasonsEntity | unknown> {
    const result: string | unknown =
      await this.cancelReasonsService.deleteCancelReason(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  @UseInterceptors(CheckCancelReasonExist)
  async updateCancelReason(
    @Param('id') id: number,
    @Body() body: UpdateCancelReasonDTO,
  ): Promise<CancelReasonsEntity | unknown> {
    const result = await this.cancelReasonsService.updateCancelReason(id, body);
    return result;
  }
}
