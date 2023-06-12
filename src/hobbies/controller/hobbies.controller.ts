import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { Constants } from 'src/utils/constant';
import { HobbiesDTO } from '../dto/hobbies.dto';
import { Hobbies } from '../entities/hobbies.model';
import { Request } from 'express';
import { HobbiesService } from '../service/HobbiesService';
import { JwtDTO } from 'src/user/dto/jwt.dto';
import { RetrieveTokenJwtService } from 'src/user/service/RetrieveTokenJwt';


@Controller('hobbies')
export class HobbiesController {
    constructor(private readonly HobbiesService: HobbiesService,private retrieveTokenJwtService:RetrieveTokenJwtService) {}

    @Get()
    async findAll(@Req() request: Request): Promise<Hobbies[]> {
        const decodedToken:JwtDTO = this.retrieveTokenJwtService.decodeToken(request);
        console.log(decodedToken.username);
        try{
            return await this.HobbiesService.findAll();
        }catch (e) {
            throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Post()
    async create(@Body() HobbiesDTO: HobbiesDTO) {
        try{
            const label = await this.HobbiesService.findByLabel(HobbiesDTO.label);
            if(label){
                throw new HttpException(Constants.EXISTING_LABEL, HttpStatus.BAD_REQUEST);
            }
            return await this.HobbiesService.create(HobbiesDTO);
        }catch (e) {
            throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
}
