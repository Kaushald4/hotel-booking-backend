import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

import errorHandler from "./controllers/errorController";

// app middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// app routes
import authRoutes from "./routes/authRoutes";
import hotelRoomRoutes from "./routes/hotelRoomRoutes";
import hotelBookingRoute from "./routes/bookingRoute";

// routes middleware
app.use("/api/v1", authRoutes);
app.use("/api/v1", hotelRoomRoutes);
app.use("/api/v1", hotelBookingRoute);

// Golbal Error Handler
app.use(errorHandler);

export { app };
