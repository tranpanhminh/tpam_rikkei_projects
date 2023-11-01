import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import axios from 'axios';

const path = process.env.SERVER_PATH;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
const PAYPAL_API = process.env.PAYPAL_API;
const BACKEND_PATH = process.env.BACKEND_PATH;
const FRONTEND_PATH = process.env.FRONTEND_PATH;

// -------------------------------------------------------

@Controller(`${path}/paypal`)
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}
  @Post('/create-order')
  async createOrder(
    @Body() paymentData: any,
    @Req() req: any,
    @Res() res: any,
  ) {
    try {
      paymentData = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '5.00',
            },
          },
        ],
        application_context: {
          brand_name: 'mycompany.com',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${BACKEND_PATH}/${path}/paypal/capture-order`,
          cancel_url: `${BACKEND_PATH}/${path}/paypal/cancel-order`,
        },
      };

      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      console.log(params);
      const {
        data: { access_token },
      } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_SECRET_KEY,
        },
      });

      await axios
        .post(`${PAYPAL_API}/v2/checkout/orders`, paymentData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
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

  @Get('/capture-order')
  async captureOrder(@Req() req: any, @Res() res: any) {
    const { token } = req.query;
    console.log(token);

    await axios
      .post(
        `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET_KEY,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        res.send(error);
      });
  }

  @Get('/cancel-order')
  async cancelOrder(@Req() req: any, @Res() res: any) {
    res.redirect(`${FRONTEND_PATH}/cart`);
  }
}
