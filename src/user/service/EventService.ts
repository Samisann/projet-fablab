import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Constants } from "src/utils/constant";
import { EventDTO } from "../dto/event.dto";
import { Event, EventDocument } from "../entities/event.model";

@Injectable()
export class UserService{
    constructor(
        @InjectModel(Event.name) private readonly model: Model<EventDocument>,
      ) {}
    async findAll():Promise<Event[]>{
        return this.model.find().exec();
    }


}