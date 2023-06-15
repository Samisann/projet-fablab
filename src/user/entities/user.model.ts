import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, SchemaTypes, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({collection:'users'})
export class User{
    _id:mongoose.Schema.Types.ObjectId;
    @Prop({required:true,unique:true})
    email: string;
    @Prop({required:true})
    nom: string;
    @Prop({required:true})
    prenom:string;
    @Prop({required:true})
    telephone:string;
    @Prop({required:true})
    password:string;
    @Prop({ required: true })
    createdAt: Date;
    @Prop({required:true, unique:true})
    hobbies:string[]
}
export const UserSchema = SchemaFactory.createForClass(User);