import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PasswordResetService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'connextu.webtech@gmail.com',
      pass: 'Bonjour2023',
    },
  });

  async sendResetEmail(email: string, resetLink: string) {
    const mailOptions = {
      from: 'connextu.webtech@gmail.com',
      to: email,
      subject: 'Réinitialisation de mot de passe',
      text: `Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
    };
    const info = await this.transporter.sendMail(mailOptions);
    console.log(`Email envoyé : ${info.messageId}`);
  }
}
