"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getLogginInUser = exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const AppError_1 = require("../utils/AppError");
const UserRole_1 = require("../utils/UserRole");
const catchAsyncError_1 = require("../utils/catchAsyncError");
exports.signup = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new AppError_1.AppError("Please provide name, email and password", 400));
    }
    let user = await User_1.default.findByEmail(email);
    if (user) {
        return next(new AppError_1.AppError("User already exists", 400));
    }
    user = await User_1.default.create({
        name,
        email,
        password,
        role: UserRole_1.USER_ROLE.USER,
    });
    const token = user.generateJwtToken();
    res.status(201).json({
        success: true,
        data: { ...user._doc, password: undefined, token },
    });
});
exports.login = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError_1.AppError("All Fields are required", 400));
    }
    let user = await User_1.default.findByEmail(email);
    if (!user) {
        return next(new AppError_1.AppError("User doesn't exist!", 400));
    }
    let isPassValid = await user.isPasswordValid(password);
    if (!isPassValid) {
        return next(new AppError_1.AppError("Invalid Credentials!", 400));
    }
    const token = user.generateJwtToken();
    res.status(201).json({
        success: true,
        data: { ...user._doc, password: undefined, token },
    });
});
exports.getLogginInUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const user = await User_1.default.findById(req.user?._id);
    res.status(200).json({
        success: true,
        data: { ...user?._doc, password: undefined },
    });
});
exports.getAllUsers = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const users = await User_1.default.find({}).select("-password");
    res.status(200).json({
        success: true,
        data: users,
    });
});
