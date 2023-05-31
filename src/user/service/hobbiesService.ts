
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HobbiesDTO } from "src/hobbies/dto/hobbies.dto";
import { Hobbies } from "src/hobbies/entities/hobbies.model";


@Injectable()
export class HobbiesService {
    constructor(
        @InjectModel(Hobbies.name) private readonly model: Model<Hobbies>,
        ) {}


    async findAll():Promise<Hobbies[]>{
        return this.model.find().exec();
    }


}
