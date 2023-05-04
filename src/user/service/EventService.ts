import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { InjectModel } from "@nestjs/mongoose";
import { randomBytes } from "crypto";
import { Model } from "mongoose";
import { Constants } from "src/utils/constant";
import { EventDTO } from "../dto/event.dto";
import { Events, EventDocument } from "../entities/event.model";
import { UserService } from '../service/UserService';
import { Hobbies } from "src/hobbies/entities/hobbies.model";
import { User, UserDocument } from "../entities/user.model";

@Injectable()
export class EventService{
    constructor(
        @InjectModel(Events.name) private readonly model: Model<EventDocument>,
        private readonly userService: UserService,
        @InjectModel(Events.name) private readonly eventModel: Model<EventDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  

      ) {}
    async findAll():Promise<Events[]>{
        return this.model.find().exec();
    }

    async findByUsername(email: string): Promise<Events> {
        return this.model.findOne({ email }).exec();
    }

    async generateId(): Promise<number> {
        const id = randomBytes(8).toString('hex');
        return parseInt(id, 16);
        }

    async create(eventDTO: EventDTO): Promise<Events> {
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

  async findById(id: string): Promise<Events> {
    return this.model.findById(id).exec();
  }
  
    
    async delete(id: string): Promise<any> {
      return this.model.deleteOne({ _id: id }).exec();
    }
    
   
    async getEventsByUserHobbies(email: string): Promise<Events[]> {
      const userHobbies = await this.userService.getUserHobbies(email);
      const events = await this.eventModel.find().populate('hobbies').exec();
      const filteredEvents: Events[] = events.filter(event => {
        const eventHobbies = event.hobbies.map(hobby => hobby.id);
        return userHobbies.some(hobby => eventHobbies.includes(hobby));
      });
      return filteredEvents;
    }
    
    

}