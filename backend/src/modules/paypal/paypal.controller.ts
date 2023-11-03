import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaypalService } from './paypal.service';
// import axios from 'axios';
const path = process.env.SERVER_PATH;
// const BACKEND_PATH = process.env.BACKEND_PATH;
const FRONTEND_PATH = process.env.FRONTEND_PATH;

// -------------------------------------------------------

@Controller(`${path}/paypal`)
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  // 1. Create Order
  @Post('/create-order')
  async createOrder(
    @Body() paymentData: any,
    @Req() req: any,
    @Res() res: any,
  ) {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const result = await this.paypalService.createOrder(paymentData, req, res);
    return result;
  }

  // 2. Capture Order
  @Get('/capture-order')
  async captureOrder(@Req() req: any, @Res() res: any) {
    // const { token } = req.query;
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
      payer_id: payerId,
    };

    const result = await this.paypalService.captureOrder(
      paymentId,
      execute_payment_json,
      req,
      res,
    );

    return result;
  }

  // 3. Cancel Order
  @Get('/cancel-order')
  async cancelOrder(@Req() req: any, @Res() res: any) {
    res.redirect(`${FRONTEND_PATH}/cart`);
  }

  // // 4. Create Order With Detail Information
  // @Get('/create-order-detail')
  // async createOrderDetail(
  //   @Body() paymentData: any,
  //   @Req() req: any,
  //   @Res() res: any,
  // ) {
  //   // Data này chỉ Test
  //   paymentData = {
  //     intent: 'CAPTURE',
  //     purchase_units: [
  //       {
  //         amount: {
  //           currency_code: 'USD',
  //           value: '5.00',
  //         },
  //       },
  //     ],
  //     application_context: {
  //       brand_name: 'mycompany.com',
  //       landing_page: 'NO_PREFERENCE',
  //       user_action: 'PAY_NOW',
  //       return_url: `${BACKEND_PATH}/${path}/paypal/capture-order`,
  //       cancel_url: `${BACKEND_PATH}/${path}/paypal/cancel-order`,
  //     },
  //   };

  //   const params = new URLSearchParams();
  //   params.append('grant_type', 'client_credentials');

  //   const result = await this.paypalService.createOrder(paymentData, req, res);
  //   return result;
  // }

  // // 5. Check Wallet Balance
  // @Get('/check-wallet-balance')
  // async checkWalletBalance(@Req() req, @Res() res) {
  //   const params = new URLSearchParams();
  //   params.append('grant_type', 'client_credentials');
  //   params.append(
  //     'scope',
  //     'https://uri.paypal.com/services/reporting/balances/read',
  //   );
  //   // params.append(
  //   //   'scope',
  //   //   'https://uri.paypal.com/services/reporting/search/read',
  //   // );
  //   console.log(params);
  //   const result = await this.paypalService.checkWalletBalance(
  //     params,
  //     req,
  //     res,
  //   );
  //   return result;
  // }

  // // 6. Capture Complete Order
  // @Get('/capture-complete-order')
  // async captureCompleteOrder(@Req() req: any, @Res() res: any) {
  //   const { token } = req.query;
  //   const result = await this.paypalService.captureCompleteOrder(
  //     token,
  //     req,
  //     res,
  //   );
  //   return result;
  // }

  // // 6. Create Webhook
  // @Post('/add-webhook')
  // async addWebhook(@Req() req: any, @Res() res: any) {
  //   const { token } = req.query;
  //   console.log(req.body);
  //   const result = await this.paypalService.addWebhook(req.body, token, req);
  //   return result;
  // }

  // // 6. Get Webhook
  // @Get('/list-webhooks')
  // async getWebhooks(@Req() req: any, @Res() res: any) {
  //   const params = new URLSearchParams();
  //   params.append('grant_type', 'client_credentials');
  //   const result = await this.paypalService.getWebhooks(params, req, res);
  //   return result;
  // }

  // // 6. Get Webhook
  // @Get('/list-webhooks/detail/:id')
  // async detailWebhook(
  //   @Param('id') id: number,
  //   @Req() req: any,
  //   @Res() res: any,
  // ) {
  //   const params = new URLSearchParams();
  //   params.append('grant_type', 'client_credentials');
  //   const result = await this.paypalService.detailWebhook(id, params, req, res);
  //   return result;
  // }
}
