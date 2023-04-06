import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type HobbiesDocument = HydratedDocument<Hobbies>;

@Schema({collection:'hobbies'})
export class Hobbies{
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
}
export const HobbiesSchema = SchemaFactory.createForClass(Hobbies);