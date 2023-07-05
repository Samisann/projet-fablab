import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { InjectModel } from "@nestjs/mongoose";
import { randomBytes } from "crypto";
import { Model } from "mongoose";
import { Constants } from "src/utils/constant";
import { EventDTO } from "../dto/event.dto";
import { Event, EventDocument } from "../entities/event.model";
import { UserService } from '../service/UserService';
import { Hobbies } from "src/hobbies/entities/hobbies.model";
import { User, UserDocument } from "../entities/user.model";
import { Double, Long } from "typeorm";

@Injectable()
export class EventService{
    constructor(
        @InjectModel(Event.name) private readonly model: Model<EventDocument>,
        private readonly userService: UserService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  

      ) {}
      async findAll():Promise<Event[]>{
        return this.model.find().exec();
    }

    async findByUsername(email: string): Promise<Event> {
        return this.model.findOne({ email }).exec();
    }

    async generateId(): Promise<number> {
        const id = randomBytes(8).toString('hex');
        return parseInt(id, 16);
        }

    async create(eventDTO: EventDTO): Promise<Event> {
        const event = new this.model({
            ...eventDTO,
            eventId: await this.generateId(),
            createdAt: new Date(),
          });
          event.lieu = eventDTO.lieu;
          return await event.save();

    }

    


    
  // async findEventsByUserHobbies(email: string): Promise<Event[]> {
  //   // Step 1: Retrieve user by email
  //   const user = await this.userModel.findOne({ email }).exec();
  //   if (!user) {
  //     throw new Error('User not found');
  //   }

   
  //   const userHobbies = user.hobbies.map((hobby) => hobby.id);

    
  //   const events = await this.eventModel.find().exec();

    
  //   const filteredEvents = events.filter((event) =>
  //     event.hobbies.some((hobby) => userHobbies.includes(hobby.id)),
  //   );

  //   return filteredEvents;
  // }

  // async findById(email: string): Promise<Events> {
  //   return this.model.findById(email).exec();
  // }
  
    
  //   async delete(email: string): Promise<any> {
  //     return this.model.deleteOne({ email: email }).exec();
  //   }
    // EventService

// async deleteEventById(eventId: Double): Promise<void> {
//   const event = await this.model.findByIdAndDelete(eventId).exec();
//   if (!event) {
//     throw new HttpException('Event not found or you are not authorized to delete it', HttpStatus.NOT_FOUND);
//   }
//   await this.model.deleteOne({ _id: eventId }).exec();
// }
async deleteEventById(eventId: number, userEmail: string): Promise<Event> {
  // Vérification de l'existence de l'événement
  const event = await this.model.findOne({ eventId }).exec();
  if (!event) {
    throw new NotFoundException('Event not found');
  }

  // Vérification de l'e-mail de l'utilisateur
  if (event.email !== userEmail) {
    throw new UnauthorizedException("You don't have permission to delete this event");
  }

  // Suppression de l'événement
  const deletedEvent = await this.model.findByIdAndDelete(event._id).exec();
  return deletedEvent;
}



   
    async getEventsByUserHobbies(email: string): Promise<Event[]> {
      const userHobbies = await this.userService.getUserHobbies(email);
      const events = await this.model.find().populate('hobbies').exec();
      const filteredEvents: Event[] = events.filter(event => {
        const eventHobbies = event.hobbies.map(hobby => hobby.id);
        return userHobbies.some(hobby => eventHobbies.includes(hobby));
      });
      return filteredEvents;
    }
    
    

}