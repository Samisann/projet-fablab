import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator"
import mongoose from "mongoose";

export class EventDTO{
    userId: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty()
    nom: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    date:string;
    
    @Type(() => Object)
    @IsNotEmpty()
    lieu:{
        lat:string;
        long:string;
    }
    @IsNotEmpty()
    prix:number;
    @IsNotEmpty()
    hobbies:{
        id:string;
        label:string}[];
        

}