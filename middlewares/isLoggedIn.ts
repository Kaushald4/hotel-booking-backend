import { RequestX, Response, NextFunction } from "express";
import jwt, { IJwtPayload } from "jsonwebtoken";
import User  from "../models/User";
import { AppError } from "../utils/AppError";
import { catchAsyncError } from "../utils/catchAsyncError";

export const isLoggedIn = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        let token = req.cookies.token || req.headers.authorization?.replace("Bearer", "").trim();

        if (!token) {
            return next(new AppError("Invalid token! Login again", 401));
        }

        const decoded = <IJwtPayload>jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new AppError("User no longer exists!", 401));
        }

        req.user = user;
        return next();
    }
);