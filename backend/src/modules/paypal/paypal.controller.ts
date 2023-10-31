import { Body, Controller, Post } from '@nestjs/common';
import { PaypalService } from './paypal.service';
// import { ConfigModule } from '@nestjs/config';

// ConfigModule.forRoot({
//   envFilePath: '.env',
// });
const path = process.env.SERVER_PATH;

// -------------------------------------------------------

@Controller(`${path}/paypal`)
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}
  @Post('/create-payment')
  async createPayment(@Body() paymentData: any) {
    paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://return.url',
        cancel_url: 'http://cancel.url',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'item',
                sku: 'item',
                price: '1.00',
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: '1.00',
          },
          description: 'This is the payment description.',
        },
      ],
    };
    const payment = await this.paypalService.createPayment(paymentData);
    return payment;
  }

  @Post('execute-payment')
  async executePayment(@Body() paymentData: any) {
    const executePayment = await this.paypalService.executePayment(paymentData);
    return executePayment;
  }
}
