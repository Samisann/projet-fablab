import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Constants } from "src/utils/constant";
import { UpdatePasswordDTO } from "../dto/updatePassword.dto";
import { UserDTO } from "../dto/user.dto";
import { User, UserDocument } from "../entities/user.model";
import { randomBytes } from 'crypto';
import { promisify } from 'util';

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
        return this.model.findOne({ email }).exec();
    }

    async updatePassword(email: string, updatePasswordDTO : UpdatePasswordDTO ): Promise<User> {
      const { oldPassword, ...rest } = updatePasswordDTO;

      const user = this.model.findOne({ email }).exec();
    //if the old password doesn't match the one in the database
        if ((await user).password !== oldPassword) {
            throw new HttpException('Wrong old password', HttpStatus.BAD_REQUEST);

        }

    // else if the new password is not the same in the confirm password field
        else if (rest.newPassword !== rest.confirmPassword) {
            throw new HttpException('New password and confirm password do not match', HttpStatus.BAD_REQUEST);
        }
        // if the length of the new password is less than 8 characters
        else if (rest.newPassword.length < 8) {
            throw new HttpException('New password must be at least 8 characters', HttpStatus.BAD_REQUEST);
        }
        // else return 201 for success
        else {
            return  this.model.findOneAndUpdate(
                {email:email},
                {password:rest.newPassword},
                {new:true}
            ).exec();
            
        }
    }

    async updateAfterReset(email: string, userDTO: UserDTO): Promise<User> {
        const tempPassword = (await promisify(randomBytes)(8)).toString('hex');
      
        const user = await this.model.findOne({ email }).exec();
      
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      
        const update = {
          password: userDTO.password,
          tempPassword: tempPassword
        };
      
        return this.model.findOneAndUpdate({ email: email }, update, { new: true }).exec();
      }

      // retrieve hobbies
        async findAllHobbies(): Promise<User[]> {
            return this.model.find().populate('hobbies').exec();
        }
      
  

      async getUserHobbies(email: string): Promise<string[]> {
        const user = await this.model.findOne({ email }).exec();
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user.hobbies.map((hobby) => hobby);
      }
}