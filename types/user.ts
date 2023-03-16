import mongoose, { Document, Model } from "mongoose";



export interface IUser {
    name: string;
    email: string;
    password: string;
    phoneNo: number;
    dob: Date;
    lastLoginAt: Date;
    role: "USER" | "ADMIN";

}

export interface IUserDocument extends IUser, Document {
    isPasswordValid: (password: string) => Promise<boolean>;
    generateJwtToken: () => string;
    _doc: IUser
}

export interface IUserModel extends Model<IUserDocument> {
    findByEmail: (email: string) => Promise<IUserDocument>;
}