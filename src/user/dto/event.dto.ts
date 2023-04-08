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
    @IsNotEmpty()
    lieu:string;
    @IsNotEmpty()
    prix:number;
}