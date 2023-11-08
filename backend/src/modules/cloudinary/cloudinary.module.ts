import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { EmailService } from '../email/email.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService, EmailService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
