import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDTO } from './dto/create-payment.dto';
import { UpdatePaymentDTO } from './dto/update-payment.dto';
import { ConfigModule } from '@nestjs/config';
import { PaymentsEntity } from './database/entity/payments.entity';

ConfigModule.forRoot({
  envFilePath: '.env',
});
const path = process.env.SERVER_PATH;

// -------------------------------------------------------
@Controller(`${path}/payments`)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // 1. Get All
  @Get()
  async getAllPayments() {
    const result = await this.paymentsService.getAllPayments();
    return result;
  }

  // 2. Get Detail
  @Get('/detail/:id')
  async getDetailPayment(
    @Param('id') id: number,
  ): Promise<PaymentsEntity | unknown> {
    const result: PaymentsEntity | unknown =
      await this.paymentsService.getDetailPayment(id);
    return result;
  }

  // 3. Add
  @Post('/add')
  async addPayment(
    @Body() body: CreatePaymentDTO,
  ): Promise<PaymentsEntity | unknown> {
    const result: string | unknown =
      await this.paymentsService.addPayment(body);
    return result;
  }

  // 4. Delete
  @Delete('/delete/:id')
  async deletePayment(
    @Param('id') id: number,
  ): Promise<PaymentsEntity | unknown> {
    const result: string | unknown =
      await this.paymentsService.deletePayment(id);
    return result;
  }

  // 5. Update
  @Patch('update/:id')
  async updatePayment(
    @Param('id') id: number,
    @Body() body: UpdatePaymentDTO,
  ): Promise<PaymentsEntity | unknown> {
    const result = await this.paymentsService.updatePayment(id, body);
    return result;
  }
}
