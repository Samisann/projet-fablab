import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator"

export class EventDTO{
    @IsEmail()
    email: string;
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

    @IsNotEmpty()
    imageUrl:string;
    


}