import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Constants } from "src/utils/constant";
import { HobbiesDTO } from "../dto/hobbies.dto";
import { Hobbies, HobbiesDocument } from "../entities/hobbies.model";


@Injectable()
export class HobbiesService {    
    
    constructor(
        @InjectModel(Hobbies.name) private readonly model: Model<HobbiesDocument>,
      ) {}
    async findAll():Promise<Hobbies[]>{
        return this.model.find().exec();
    }

    async create(HobbiesDTO: HobbiesDTO): Promise<Hobbies> {
        return await new this.model({
          ...HobbiesDTO
        }).save();
    }

    async findByLabel(label: string): Promise<Hobbies> {
        return this.model.findOne({ label }).exec();
    }

}
