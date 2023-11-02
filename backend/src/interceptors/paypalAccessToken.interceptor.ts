import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PaypalService } from 'src/modules/paypal/paypal.service';

@Injectable()
export class PaypalAccessTokenInterceptor implements NestInterceptor {
  constructor(private paypalService: PaypalService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const accessToken = await this.paypalService.getAccessToken();

    const request = context.switchToHttp().getRequest();
    request.paypalAccessToken = accessToken;

    return next.handle();
  }
}
