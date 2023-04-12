import { Controller, Post, Body} from '@nestjs/common';
import { EventService } from '../../service/EventService';
import { EventDTO } from '../../dto/event.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Constants } from 'src/utils/constant';


@Controller('v1/user')
export class EventController {
    constructor(private readonly EventService: EventService) {}

    @Post("event")
    async create(@Body() EventDTO: EventDTO) {
        const email = await this.EventService.findByUsername(EventDTO.email);
        if(!email){
            throw new HttpException("Le champ email est requis", HttpStatus.BAD_REQUEST);
        }
        else if(!EventDTO.nom){
            throw new HttpException("Le champ nom est requis", HttpStatus.BAD_REQUEST);
        }
        else if(!EventDTO.description){
            throw new HttpException("Le champ description est requis", HttpStatus.BAD_REQUEST);
        }
        else if(!EventDTO.date){
            throw new HttpException("Le champ date est requis", HttpStatus.BAD_REQUEST);
        }
        else if(!EventDTO.lieu){
            throw new HttpException("Le champ lieu est requis", HttpStatus.BAD_REQUEST);
        }else if(EventDTO.prix && isNaN(EventDTO.prix)){
            throw new HttpException("Le champ prix doit être un nombre", HttpStatus.BAD_REQUEST);
        }
   
        try{
          
            return await this.EventService.create(EventDTO);
        }catch (e) {
            throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
