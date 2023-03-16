"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const AppError_1 = require("../utils/AppError");
const catchAsyncError_1 = require("../utils/catchAsyncError");
exports.isLoggedIn = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    let token = req.cookies.token || req.headers.authorization?.replace("Bearer", "").trim();
    if (!token) {
        return next(new AppError_1.AppError("Invalid token! Login again", 401));
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = await User_1.default.findById(decoded.id);
    if (!user) {
        return next(new AppError_1.AppError("User no longer exists!", 401));
    }
    req.user = user;
    return next();
});
