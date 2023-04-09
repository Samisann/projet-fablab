import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PasswordResetService } from './service/password-reset.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { Constants } from 'src/utils/constant';
import { User } from 'src/user/entities/user.model';
import { UserService } from 'src/user/service/UserService';


@Controller('auth')
export class AuthController {
  constructor(
    private passwordResetService: PasswordResetService,
    private userService: UserService, // inject the user service here
  ) {}

  @Post('reset-password')
  async sendPasswordResetEmail(@Body() userDTO: UserDTO) {

    try {
      const user = await this.userService.findByUsername(userDTO.email);

      if (!user) {
        throw new HttpException(Constants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      const resetLink = 'http://localhost:3000/reset-password';
      await this.passwordResetService.sendResetEmail(userDTO.email, resetLink);
      return { message: 'Email envoyé' };
      
    } catch (e) {
      throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
