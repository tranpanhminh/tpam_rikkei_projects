import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import axios from 'axios';

const path = process.env.SERVER_PATH;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
const PAYPAL_API = process.env.PAYPAL_API;
const PAYPAL_ACCESS_TOKEN = process.env.PAYPAL_ACCESS_TOKEN;

// -------------------------------------------------------

@Controller(`${path}/paypal`)
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}
  @Post('/create-payment')
  async createOrder(
    @Body() paymentData: any,
    @Req() req: any,
    @Res() res: any,
  ) {
    try {
      paymentData = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel',
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

      const params = new URLSearchParams();
      params.append('grand_type', 'client_credentials');
      console.log(params);
      const {
        data: { token },
      } = await axios.post(
        'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET_KEY,
          },
        },
      );
      console.log(token);

      await axios
        .post(`${PAYPAL_API}/v2/checkout/orders`, paymentData, {
          headers: {
            Authorization: `Bearer ${PAYPAL_ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          return res.json(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send('ERROR');
    }
  }

  @Get('/execute-payment')
  async captureOrder(
    @Body() paymentData: any,
    @Res() request: any,
    @Res() response: any,
  ) {
    // Thực hiện thanh toán
    const payerId = request.query.PayerID;
    const paymentId = request.query.paymentId;
    paymentData = {
      payer_id: 1,
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: '1.00',
          },
        },
      ],
    };
    console.log(request.query);
    console.log(paymentData, 'AAA');

    const executePayment = await this.paypalService.captureOrder(
      payerId,
      paymentId,
      paymentData,
      request,
      response,
    );
    return executePayment;
  }
}
