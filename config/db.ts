import mongoose from "mongoose";
import { config } from "./index";
import { AppError } from "../utils/AppError";

const connectDB = async () => {
    return mongoose
        .connect(config.DB_URL, { dbName: "hoteldb" })
    
        .then((ref) => {
            console.log("DB CONNECTED...");
            return ref;
        })
        .catch((err) => new AppError(err, 500));
};

export { connectDB };