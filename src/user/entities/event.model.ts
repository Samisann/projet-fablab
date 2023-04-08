
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema({collection:'events'})
export class Event{
    @Prop({required:true,unique:true})
    nom: string;
    @Prop({required:true})
    description: string;
    @Prop({required:true})
    date:string;
    @Prop({required:true})
    lieu:string;
    @Prop({required:true})
    prix:string;
    @Prop({ required: true })
    createdAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);