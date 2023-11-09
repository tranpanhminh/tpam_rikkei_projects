import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      requireTLS: true,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    } as SMTPTransport.Options);
  }

  async sendEmail(to: string, subject: string, htmlContent: string) {
    const mailOptions = {
      from: process.env.MAIL_EMAIL,
      to,
      subject,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
