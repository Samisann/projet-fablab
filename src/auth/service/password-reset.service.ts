import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { UserService } from 'src/user/service/UserService';
import { createTransport } from 'nodemailer';
import * as dotenv from 'dotenv';

@Injectable()
export class PasswordResetService {
  private transporter;

  constructor( 
    private readonly userService: UserService,
    ) {
      dotenv.config();
      this.transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_PASSWORD,
        },
      });
    }

  async sendTempPasswordByEmail(email: string): Promise<void> {
    
    const tempPassword = (await promisify(randomBytes)(8)).toString('hex');

    // Update the user's password with the temporary password
    const user = await this.userService.findByUsername(email);
    user.password = tempPassword;
    

    // Send the email to the user with the temporary password
    await this.transporter.sendMail({
      to: email,
      subject: 'Votre mot de passe temporaire',
      html: `Votre mot de passe temporaire est: <strong>${tempPassword}</strong>`,
    });
  }
}
