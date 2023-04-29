import { IsEmail } from "class-validator"

export class PasswordForgotDTO{
    @IsEmail()
    email:string;

}