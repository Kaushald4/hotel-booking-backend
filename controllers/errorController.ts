import { Request, Response, NextFunction } from "express";
import { CastError, MongooseError } from "mongoose";
import { errorStatusEnumMap, ErrorStatus, AppError } from "../utils/AppError";

const handleDBCastError = (err: CastError) => {
    const message = `Invalid ${err.path} ${err.value}`;
    return new AppError(message, 400);
};


const handleDublicateFieldError = (error: any) => {
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};


const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);

    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

const handleJWTError = () => new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
    new AppError("Your token has expired! Please log in again.", 401);


    const sendErrorDev = (err: any, req: Request, res: Response) => {
    if (req.originalUrl.startsWith("/api/v1")) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
};

const sendErrorProd = (err: any, req: Request, res: Response) => {
    if (req.originalUrl.startsWith("/api/v1")) {
        // a.) operation, trusted error send error to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error("ERROR 💥", err);
    // 2) Send generic message
    return res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
    });
};

export = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || errorStatusEnumMap(ErrorStatus.error);

    if (process.env.NODE_ENV == "development") {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV == "production") {
        let error = { ...err };
        error.message = err.message;

        if (error.name == "CastError") error = handleDBCastError(error);
        if (error.code === 11000) error = handleDublicateFieldError(error);
        if (error.name === "ValidationError") error = handleValidationErrorDB(error);
        if (error.name === "UnauthorizedError") error = handleJWTError();
        if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
        sendErrorProd(error, req, res);
    }
};