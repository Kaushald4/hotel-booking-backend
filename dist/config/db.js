"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./index");
const AppError_1 = require("../utils/AppError");
const connectDB = async () => {
    return mongoose_1.default
        .connect(index_1.config.DB_URL, { dbName: "hoteldb" })
        .then((ref) => {
        console.log("DB CONNECTED...");
        return ref;
    })
        .catch((err) => new AppError_1.AppError(err, 500));
};
exports.connectDB = connectDB;
