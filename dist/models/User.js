"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const UserRole_1 = require("../utils/UserRole");
const UserSchema = new mongoose_1.Schema({
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
        enum: Object.values(UserRole_1.USER_ROLE),
    },
}, { timestamps: true });
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
//validate that given password is correct or not
UserSchema.methods.isPasswordValid = async function (plainPassword) {
    return await bcryptjs_1.default.compare(plainPassword, this.password);
};
//create and return JWT token
UserSchema.methods.generateJwtToken = function () {
    const token = jsonwebtoken_1.default.sign({ id: this._id }, config_1.config.JWT_SECRET, {
        expiresIn: config_1.config.JWT_EXPIRES_IN,
    });
    return token;
};
UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};
exports.default = mongoose_1.default.model("User", UserSchema);
