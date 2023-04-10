import { Controller, Post, Body, Get, Param, Delete} from '@nestjs/common';
import { EventService } from '../../service/EventService';
import { EventDTO } from '../../dto/event.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Constants } from 'src/utils/constant';
import { eventNames } from 'process';
import { User } from 'src/user/entities/user.model';
import { UserService } from 'src/user/service/UserService';


@Controller('event')
export class EventController {
    constructor(private readonly EventService: EventService,
        private readonly userService: UserService,) {}

    @Post()
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
        }else 
        {
            //service indisponible
            throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
        }

   
        try{
          
            return await this.EventService.create(EventDTO);
        }catch (e) {
            throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
  async getEventInfo(@Body() EventDTO: EventDTO): Promise<Event> {
    try {
      const event = await this.EventService.findByUsername(EventDTO.nom);

      if (!event) {
        throw new HttpException(Constants.EVENT_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      const { nom, date, lieu, prix } = event;

      return { nom, date, lieu, prix };
    } catch (e) {
      throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':email/event/:id')
  async deleteEvent(
    @Param('email') email: string,
    @Param('id') id: string,
  ): Promise<string> {
    const user: User = await this.userService.findByUsername(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const event: Event = await this.EventService.findByUsername(id);
    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    if (event.creator.toString() !== user._id.toString()) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }

    await this.EventService.delete(id);
    return 'Event deleted successfully';
  }
}

