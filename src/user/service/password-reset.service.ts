import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { UserService } from 'src/user/service/UserService';
import { createTransport } from 'nodemailer';
import * as dotenv from 'dotenv';
import { UpdatePasswordDTO } from '../dto/updatePassword.dto';
import { UserDTO } from '../dto/user.dto';


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
    
      const userDTO = new UserDTO();
      userDTO.password = tempPassword;
    
      const updatedUser = await this.userService.updateAfterReset(email, userDTO);
    
      await this.transporter.sendMail({
        to: email,
        subject: 'Votre mot de passe temporaire',
        html: `Votre mot de passe temporaire est: <strong>${userDTO.password}</strong>`,
      });
    }
    
}
