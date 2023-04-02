// class validation
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UpdatePasswordDTO {

    // email
    // @IsEmail()
    // @IsNotEmpty()
    // email: string;


    //minimum 8 characters
    @IsNotEmpty()
    @MinLength(8)
    oldPassword: string;

    //minimum 8 characters
    @IsNotEmpty()
    @MinLength(8)
    newPassword: string;

    //minimum 8 characters
    @IsNotEmpty()
    @MinLength(8)
    confirmPassword: string;

}