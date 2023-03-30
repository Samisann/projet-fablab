import { IsEmail, IsNotEmpty } from "class-validator"

export class UserDTO{
    @IsEmail()
    email:string;
    @IsNotEmpty()
    nom:string;
    @IsNotEmpty()
    prenom:string;
    @IsNotEmpty()
    password:string;
    @IsNotEmpty()
    telephone:string;
}