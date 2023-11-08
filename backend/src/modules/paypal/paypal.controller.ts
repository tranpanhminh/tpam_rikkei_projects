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
}
