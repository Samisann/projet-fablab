import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDTO } from "../dto/user.dto";
import { User, UserDocument } from "../entities/user.model";

@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name) private readonly model: Model<UserDocument>,
      ) {}
    async findAll():Promise<User[]>{
        return this.model.find().exec();
    }

    async create(userDTO: UserDTO): Promise<User> {
        return await new this.model({
          ...userDTO,
          createdAt: new Date(),
        }).save();
    }

    

    async findByUsername(email: string): Promise<User> {
        return   this.model.findOne({ email }).exec();
      }

}