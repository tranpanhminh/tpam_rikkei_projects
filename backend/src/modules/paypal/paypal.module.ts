import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalProvider } from './paypal.provider';

@Module({
  providers: [PaypalProvider, PaypalService],
  exports: [PaypalProvider, PaypalService],
})
export class PaypalModule {}
