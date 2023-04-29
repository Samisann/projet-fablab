import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Constants } from "src/utils/constant";
import { EventDTO } from "../dto/event.dto";
import { Event, EventDocument } from "../entities/event.model";
import { UserService } from '../service/UserService';
import { Hobbies } from "src/hobbies/entities/hobbies.model";
import { User, UserDocument } from "../entities/user.model";

@Injectable()
export class EventService{
    constructor(
        @InjectModel(Event.name) private readonly model: Model<EventDocument>,
        private readonly userService: UserService,
        @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  

      ) {}
    async findAll():Promise<Event[]>{
        return this.model.find().exec();
    }

    async findByUsername(email: string): Promise<Event> {
        return this.model.findOne({ email }).exec();
    }

    async create(eventDTO: EventDTO): Promise<Event> {
        const event = new this.model({
            ...eventDTO,
            createdAt: new Date(),
          });
          event.lieu = eventDTO.lieu;
          return await event.save();

    }

    async findEventsByUserHobbies(userId: string): Promise<Event[]> {
      // Récupérer les hobbies de l'utilisateur
      const user = await this.userModel.findById(userId).populate('hobbies').exec();
      const userHobbies = user.hobbies.map((hobby) => hobby.id);
  
      // Récupérer les événements qui ont les mêmes hobbies que l'utilisateur
      const events = await this.eventModel.find({ hobbies: { $in: userHobbies } }).exec();
  
      return events;
    }

    async findById(id: string): Promise<Event> {
      return this.model.findById(id).exec();
    }
    
    async delete(id: string): Promise<any> {
      return this.model.deleteOne({ _id: id }).exec();
    }
    
    
    

}