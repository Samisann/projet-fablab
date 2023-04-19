import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Constants } from "src/utils/constant";
import { EventDTO } from "../dto/event.dto";
import { Event, EventDocument } from "../entities/event.model";

@Injectable()
export class EventService{
    constructor(
        @InjectModel(Event.name) private readonly model: Model<EventDocument>,
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

}