import * as paypal from 'paypal-rest-sdk';

export const PaypalProvider = {
  provide: 'PAYPAL',
  useFactory: () => {
    return paypal.configure({
      mode: 'sandbox',
      client_id: process.env.PAYPAL_CLIENT_ID,
      client_secret: process.env.PAYPAL_SECRET_KEY,
      authorize_url:
        process.env.EVIRONMENT === 'sandbox'
          ? 'https://api-m.sandbox.paypal.com'
          : 'https://api-m.paypal.com',
    });
  },
};