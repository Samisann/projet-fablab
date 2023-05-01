
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema({collection:'events'})
export class Event{
    @Prop({required:true,unique:true})
    email: string;
    @Prop({required:true,unique:true})
    nom: string;
    @Prop({required:true})
    description: string;
    @Prop({required:true})
    date:string;
    @Prop({required:true, type: mongoose.Schema.Types.Mixed})
    lieu:{
        lat:string;
        long:string;
    }
    @Prop({required:true})
    prix:number;

    @Prop({required:true, unique:true})
    eventId:number;

    @Prop({required:true, unique:true})
    hobbies:{
        id:string;
        label:string;
    }[];

}

export const EventSchema = SchemaFactory.createForClass(Event);