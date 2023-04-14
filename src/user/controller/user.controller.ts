import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Constants } from 'src/utils/constant';
import { UpdatePasswordDTO } from '../dto/updatePassword.dto';
import { UserDTO } from '../dto/user.dto';
import { UserService } from '../service/UserService';
import { User } from '../entities/user.model';
import {ApiParam} from '@nestjs/swagger';
import { PasswordResetService } from '../service/password-reset.service';
import { PasswordForgotDTO } from '../dto/passwordForgot.dto';


@Controller('v1/user')
export class UserController {
    constructor(private readonly userService: UserService,
        private passwordResetService: PasswordResetService,) {}
    @Post()
    async create(@Body() userDTO: UserDTO) {
        try{
            const user = await this.userService.findByUsername(userDTO.email);
            if(user){
                throw new HttpException(Constants.EXISTING_USER, HttpStatus.BAD_REQUEST);
            }
            return await this.userService.create(userDTO);
        }catch (e) {
            throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

  @Get(":email")
  @ApiParam({ name: 'email', type: String })
  async getUserInfo(@Param() params): Promise<Pick<User, 'email' | 'nom' | 'prenom' | 'telephone'>> {
      const user = await this.userService.findByUsername(params.email);

      if (!user) {
        throw new HttpException(Constants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const { email, nom, prenom, telephone } = user;

      return { email, nom, prenom, telephone };
   
  }

   @Post('password')
   async updatePassword(@Body() updatePasswordDTO : UpdatePasswordDTO) {
            const user =this.userService.findByUsername(updatePasswordDTO.email);
            if(user ){
                 await this.userService.updatePassword(updatePasswordDTO.email, updatePasswordDTO);
            }else{
                throw new HttpException(Constants.EXISTING_USER, HttpStatus.BAD_REQUEST);
            }
    }

    @Post('reset-password')
    async sendPasswordResetEmail(@Body() passwordForgotDTO: PasswordForgotDTO) {
  
     // try {
        const user = await this.userService.findByUsername(passwordForgotDTO.email);
  
        if (!user) {
          throw new HttpException(Constants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        await this.passwordResetService.sendTempPasswordByEmail(passwordForgotDTO.email);
        return { message: 'Email envoyé' };
        
    //   } catch (e) {
    //     throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
    //   }
    }

}


