import { NextFunction, Request, RequestX, Response } from "express";
import User from "../models/User";
import { AppError } from "../utils/AppError";
import { USER_ROLE } from "../utils/UserRole";
import { catchAsyncError } from "../utils/catchAsyncError";

export const signup = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(
                new AppError("Please provide name, email and password", 400)
            );
        }

        let user = await User.findByEmail(email);

        if (user) {
            return next(new AppError("User already exists", 400));
        }

        user = await User.create({
            name,
            email,
            password,
            role: USER_ROLE.USER,
        });
        const token = user.generateJwtToken();
        res.status(201).json({
            success: true,
            data: { ...user._doc, password: undefined, token },
        });
    }
);

export const login = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError("All Fields are required", 400));
        }

        let user = await User.findByEmail(email);

        if (!user) {
            return next(new AppError("User doesn't exist!", 400));
        }

        let isPassValid = await user.isPasswordValid(password);
        if (!isPassValid) {
            return next(new AppError("Invalid Credentials!", 400));
        }

        const token = user.generateJwtToken();
        res.status(201).json({
            success: true,
            data: { ...user._doc, password: undefined, token },
        });
    }
);

export const getLogginInUser = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const user = await User.findById(req.user?._id);
        res.status(200).json({
            success: true,
            data: { ...user?._doc, password: undefined },
        });
    }
);

export const getAllUsers = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const users = await User.find({}).select("-password");
        res.status(200).json({
            success: true,
            data: users,
        });
    }
);
