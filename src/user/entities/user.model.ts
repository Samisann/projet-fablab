import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({collection:'users'})
export class User{
    @Prop({required:true,unique:true})
    email: string;
    @Prop({required:true})
    nom: string;
    @Prop({required:true})
    prenom:string;
    @Prop({required:true})
    telephone:string;
    @Prop({required:true})
    password:string;
    @Prop({ required: true })
    createdAt: Date;

<<<<<<< Updated upstream
    @Prop({required:false, unique:true}) // remettre required true après test
    hobbies:{
        id:string;
        label:string;
    }[];

    @Prop({required:false, unique:true})
    imageUrl:string;
    
=======
    @Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'hobbies'})
    hobbies: mongoose.Schema.Types.ObjectId[];
>>>>>>> Stashed changes
}
export const UserSchema = SchemaFactory.createForClass(User);