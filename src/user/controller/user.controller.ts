import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Constants } from 'src/utils/constant';
import { UserDTO } from '../dto/user.dto';
import { UserService } from '../service/UserService';
import { User } from '../entities/user.model';
import { PasswordForgotDTO } from '../dto/passwordForgot.dto';
import { PasswordResetService } from 'src/auth/service/password-reset.service';

@Controller('v1/user')
export class UserController {
    constructor(private readonly userService: UserService,
      private readonly passwordResetService: PasswordResetService) {}
    @Post()
    async create(@Body() userDTO: UserDTO) {
        //try{
            const user = await this.userService.findByUsername(userDTO.email);
            if(user){
                throw new HttpException(Constants.EXISTING_USER, HttpStatus.BAD_REQUEST);
            }
            return await this.userService.create(userDTO);
        // }catch (e) {
        //     throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
        // }
        
    }


    @Get()
  async getUserInfo(@Body() userDTO: UserDTO): Promise<Pick<User, 'email' | 'nom' | 'prenom' | 'telephone'>> {
    try {
      const user = await this.userService.findByUsername(userDTO.email);

      if (!user) {
        throw new HttpException(Constants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const { email, nom, prenom, telephone } = user;

      return { email, nom, prenom, telephone };
    } catch (e) {
      throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('reset-password')
  async sendPasswordResetEmail(@Body() userDTO: PasswordForgotDTO) {

    //try {
      const user = await this.userService.findByUsername(userDTO.email);

      if (!user) {
        throw new HttpException(Constants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      await this.passwordResetService.sendTempPasswordByEmail(userDTO.email);
      return { message: 'Email envoyé' };
      
    // } catch (e) {
    // throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }
    

    

}


