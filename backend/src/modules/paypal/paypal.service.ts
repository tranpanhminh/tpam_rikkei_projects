import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as paypal from 'paypal-rest-sdk';

const path = process.env.SERVER_PATH;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
const PAYPAL_API = process.env.PAYPAL_API;
const BACKEND_PATH = process.env.BACKEND_PATH;
const FRONTEND_PATH = process.env.FRONTEND_PATH;

// -------------------------------------------------------

@Injectable()
export class PaypalService {
  async createOrder(paymentData, params, req, res) {
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
        return res.json(error);
      });
  }

  async captureOrder(token, req, res) {
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
        return res.send(response.data);
      })
      .catch((error) => {
        return res.send(error);
      });
  }
}
