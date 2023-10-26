import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';

@Module({
  providers: [VendorsService]
})
export class VendorsModule {}
