import { Controller, Post, Body, Get, Param, Query, Delete, NotFoundException, UnauthorizedException, Req} from '@nestjs/common';
import { EventService } from '../../service/EventService';
import { EventDTO } from '../../dto/event.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Constants } from 'src/utils/constant';
import * as HobbiesData from '../../../../db/v002';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hobbies } from 'src/hobbies/entities/hobbies.model';
import { Event } from 'src/user/entities/event.model';
import { User } from 'src/user/entities/user.model';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Headers } from '@nestjs/common';





@Controller('v1/user')
export class EventController {
    constructor(private readonly EventService: EventService,
      @InjectModel('Hobbies') private readonly hobbyModel: Model<Hobbies>,
      private readonly jwtService: JwtService) {}

    @Post("event")
    async create(@Body() EventDTO: EventDTO) {
        const email = await this.EventService.findByUsername(EventDTO.email);
            
         if(!EventDTO.nom){
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
        }else if(EventDTO.hobbies && EventDTO.hobbies.length > 0){  
            const hobbiesLabel = EventDTO.hobbies.map(hobby => hobby.label);
            const hobbies = await this.hobbyModel.find({label: {$in: hobbiesLabel}});
            const notFoundHobbies = hobbiesLabel.filter(hobby => !hobbies.find(hobbyFound => hobbyFound.label === hobby));
            if(notFoundHobbies.length > 0){
                throw new HttpException(`Les hobbies suivants n'existent pas: ${notFoundHobbies.join(', ')}`, HttpStatus.BAD_REQUEST);
            }
        }
        
   
        try{
            return await this.EventService.create(EventDTO);
        }catch (e) {
            console.log(e);
            throw new HttpException(Constants.SERVICE_UNAIVALAIBLE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // @Get('user/:email')
    // async findEventsByUserHobbies(@Param('email') email: string): Promise<Event[]> {
    //   return this.EventService.findEventsByUserHobbies(email);
    // }

    @Get('event/:email')
  async findByUserHobbies(@Param('email') email: string): Promise<Event[]> {
    return this.EventService.getEventsByUserHobbies(email);
  }


//   @Delete(':id')
// async delete(@Param('id') id: string, @Body('email') email: string) {
//   const event = await this.EventService.findById(id);
//   if (!event) {
//     throw new HttpException('L evenement n existe pas', HttpStatus.NOT_FOUND);
//   }
//   if (event.email !== email) {
//     throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//   }
//   await this.EventService.delete(id);
//   return { message: 'L evenement a ete correctement supprime' };
// }
// EventController

@Delete(':eventId')
  //@UseGuards(AuthGuard('jwt'))
  async deleteEventById(
    @Param('eventId') eventId: number,
    @Param('email') userEmail: string,
  ) {
    const deletedEvent = await this.EventService.deleteEventById(
      eventId,
      userEmail,
    );

    if (!deletedEvent) {
      throw new NotFoundException('Event not found');
    }

    return { deletedEvent, message: 'Event deleted successfully' };
  }







}