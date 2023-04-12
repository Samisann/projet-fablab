import { Model } from "mongoose";
import { UserDTO } from "../dto/user.dto";
import { User, UserDocument } from "../entities/user.model";
export declare class UserService {
    private readonly model;
    constructor(model: Model<UserDocument>);
    findAll(): Promise<User[]>;
    create(userDTO: UserDTO): Promise<User>;
    findByUsername(email: string): Promise<User>;
}
