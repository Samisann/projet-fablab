import { IsEmail, IsNotEmpty } from "class-validator"

export class PasswordForgotDTO{
    @IsEmail()
    email:string;

}