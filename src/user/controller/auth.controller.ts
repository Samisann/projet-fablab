import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../service/AuthService';
import { AuthDTO } from '../dto/auth.dto';
import {Public} from '../../utils/security-annotation';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: AuthDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}