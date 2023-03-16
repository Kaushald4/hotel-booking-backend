import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserDocument, IUserModel } from "../types/user";
import { config } from "../config";
import { USER_ROLE } from "../utils/UserRole";

const UserSchema = new Schema<IUserDocument, IUserModel>(
    {
        name: {
            type: String,
            maxlength: [50, "name must be less than 50 char"],
            required: [true, "please provide name"],
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            maxlength: [50, "name must be less than 50 char"],
            required: [true, "please provide email"],
            trim: true,
            lowercase: true,
        },
        lastLoginAt: Date,
        password: {
            type: String,
            required: [true, "please provide password"],
        },
        phoneNo: {
            type: Number,
        },
        dob: {
            type: Date,
        },
        role: {
            type: String,
            enum: Object.values(USER_ROLE),
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//validate that given password is correct or not
UserSchema.methods.isPasswordValid = async function (plainPassword: string) {
    return await bcrypt.compare(plainPassword, this.password);
};

//create and return JWT token
UserSchema.methods.generateJwtToken = function () {
    const token = jwt.sign({ id: this._id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
    });
    return token;
};

UserSchema.statics.findByEmail = function (email: string) {
    return this.findOne({ email });
};

export default mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
