import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type HobbiesDocument = HydratedDocument<Hobbies>;

@Schema({collection:'hobbies'})
export class Hobbies{
    @Prop({required:true,unique:true})
    label: string;
   
}
export const HobbiesSchema = SchemaFactory.createForClass(Hobbies);



