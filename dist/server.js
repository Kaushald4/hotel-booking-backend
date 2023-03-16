"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const config_1 = require("./config");
const cloudinary_1 = require("./config/cloudinary");
const db_1 = require("./config/db");
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        (0, cloudinary_1.setupCloudinary)();
        app_1.app.listen(config_1.config.PORT, () => {
            console.log(`App Started on port ${config_1.config.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
startServer();
