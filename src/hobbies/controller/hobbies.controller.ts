import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Constants } from 'src/utils/constant';
import { HobbiesDTO } from '../dto/hobbies.dto';
import { Hobbies } from '../entities/hobbies.model';

import { HobbiesService } from '../service/HobbiesService';


@Controller('hobbies')
export class HobbiesController {
    constructor(private readonly HobbiesService: HobbiesService) {}

    @Get()
    async findAll(): Promise<Hobbies[]> {
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
