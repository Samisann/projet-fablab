import mongoose, { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
export declare class User {
    email: string;
    nom: string;
    prenom: string;
    telephone: string;
    password: string;
    createdAt: Date;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & Omit<User & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & Omit<mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
