import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      requireTLS: true,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    } as SMTPTransport.Options);
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'admin@petshop.com',
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent');
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
