import { Body, Controller, Post } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-payment')
  async createPayment(@Body() paymentData: any) {
    console.log(paymentData, 'Test');
    // const payment = await this.paypalService.createPayment(paymentData);
    // return payment;
  }

  @Post('execute-payment')
  async executePayment(@Body() paymentData: any) {
    const executePayment = await this.paypalService.executePayment(paymentData);
    return executePayment;
  }
}
