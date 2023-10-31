import { Injectable } from '@nestjs/common';
import * as paypal from 'paypal-rest-sdk';

@Injectable()
export class PaypalService {
  async createPayment(paymentData: any) {
    // Thực hiện tạo thanh toán
    return new Promise((resolve, reject) => {
      paypal.payment.create(paymentData, function (error, payment) {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });
  }

  async executePayment(paymentData: any) {
    // Thực hiện thanh toán
    return new Promise((resolve, reject) => {
      const payerId = paymentData.payerId;
      const paymentId = paymentData.paymentId;

      const executePayment = {
        payer_id: payerId,
      };

      paypal.payment.execute(
        paymentId,
        executePayment,
        function (error, payment) {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        },
      );
    });
  }
}
