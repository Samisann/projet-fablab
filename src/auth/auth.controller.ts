import { Controller, Post, Body } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('auth')
export class AuthController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Post('reset-password')
  async sendPasswordResetEmail(@Body('email') email: string) {
    const resetLink = 'http://localhost:3000/reset-password';
    await this.passwordResetService.sendResetEmail(email, resetLink);
    return { message: 'Email envoyé' };
  }
}
