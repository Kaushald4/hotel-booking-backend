import dotenv from 'dotenv'
dotenv.config();

import {app} from './app';
import { config } from './config';
import { setupCloudinary } from './config/cloudinary';
import {connectDB} from './config/db';



const startServer = async () => {
    try {
        await connectDB();
        setupCloudinary()
        app.listen(config.PORT, () => {
            console.log(`App Started on port ${config.PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();



