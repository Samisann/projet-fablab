import { IsNotEmpty } from "class-validator"

export class HobbiesDTO{
    @IsNotEmpty()
    label:string;
}