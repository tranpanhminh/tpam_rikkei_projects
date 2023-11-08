// src/email/email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  providers: [EmailService, JwtService, CloudinaryService],
  exports: [EmailService],
})
export class EmailModule {}
