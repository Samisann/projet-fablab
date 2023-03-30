import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Constants } from 'src/utils/constant';
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
}
