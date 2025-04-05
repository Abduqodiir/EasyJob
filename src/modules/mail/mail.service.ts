import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      secure: configService.get('MAIL_SECURE') === 'true',
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false, // SSL muammolarini oldini olish uchun
      },
    });
  }

  async sendVerificationEmail(to: string, name: string, verificationLink: string): Promise<void> {
    const mailOptions = {
      from: `"EasyJob" <${this.configService.get('MAIL_FROM')}>`,
      to,
      subject: 'Email manzilingizni tasdiqlang - EasyJob',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2c3e50; text-align: center;">Salom, ${name}!</h2>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">EasyJob platformasida ro'yxatdan o'tganingiz uchun rahmat. Hisobingizni faollashtirish uchun, iltimos, quyidagi tugmani bosing:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #3498db; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Emailni tasdiqlash</a>
          </div>
          <p style="color: #555; font-size: 14px;">Agar siz ro'yxatdan o'tmagan bo'lsangiz, bu xabarni e'tiborsiz qoldiring.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 12px;">
            <p>EasyJob - Ish topish va ishga olish platformasi</p>
          </div>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(to: string, name: string, resetLink: string): Promise<void> {
    const mailOptions = {
      from: `"EasyJob" <${this.configService.get('MAIL_FROM')}>`,
      to,
      subject: 'Parolni tiklash - EasyJob',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2c3e50; text-align: center;">Salom, ${name}!</h2>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">Siz parolni tiklash uchun so'rov yubordingiz. Parolingizni tiklash uchun quyidagi tugmani bosing:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #3498db; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Parolni tiklash</a>
          </div>
          <p style="color: #555; font-size: 14px;">Agar siz bu so'rovni yubormagangiz bo'lsa, iltimos, bu xabarni e'tiborsiz qoldiring.</p>
          <p style="color: #555; font-size: 14px;">Bu havola 30 daqiqa davomida amal qiladi.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 12px;">
            <p>EasyJob - Ish topish va ishga olish platformasi</p>
          </div>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
