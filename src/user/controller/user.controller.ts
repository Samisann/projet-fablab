import { Body, Req, Controller, HttpException, HttpStatus, Post, Put, Param } from '@nestjs/common';
import { Constants } from 'src/utils/constant';
import { UpdatePasswordDTO } from '../dto/updatePassword.dto';
import { UserDTO } from '../dto/user.dto';
import { UserService } from '../service/UserService';

@Controller('v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}
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



    @Post('password')
    async updatePassword(email : string, @Body() UpdatePasswordDTO : UpdatePasswordDTO, @Req() request : Request) {
        try{
            const user =this.userService.findByUsername(email);

            if(user ){
                return await this.userService.updatePassword(email, UpdatePasswordDTO);
            }

            throw new HttpException(Constants.EXISTING_USER, HttpStatus.BAD_REQUEST);
        }catch (e) {
            throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // async updatePassword( UserDTO : UserDTO, @Body() UpdatePasswordDTO : UpdatePasswordDTO, @Req() request : Request) {
    //     try{
    //         const user =this.userService.findByUsername(UserDTO.email);

    //         if(user){
    //             return await this.userService.updatePassword(UserDTO.email, UpdatePasswordDTO);
    //         }
            
    //         throw new HttpException(Constants.EXISTING_USER, HttpStatus.BAD_REQUEST);
    //     }catch (e) {
    //         throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
