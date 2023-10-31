import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
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
  async createPayment(
    @Body() paymentData: any,
    @Req() request: any,
    @Res() response: any,
  ) {
    paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'https://www.sandbox.paypal.com/',
        cancel_url: 'https://www.sandbox.paypal.com/',
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
    const payment = await this.paypalService.createPayment(
      paymentData,
      request,
      response,
    );
    return payment;
  }

  @Get('/execute-payment')
  async executePayment(
    @Body() paymentData: any,
    @Res() request: any,
    @Res() response: any,
  ) {
    const executePayment = await this.paypalService.executePayment(
      paymentData,
      request,
      response,
    );
    return executePayment;
  }
}
