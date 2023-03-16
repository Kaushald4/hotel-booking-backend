"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const User_1 = require("../models/User");
const AppError_1 = require("../utils/AppError");
const catchAsyncError_1 = require("../utils/catchAsyncError");
exports.signup = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new AppError_1.AppError("Please provide name, email and password", 400));
    }
    let user = await User_1.User.findByEmail(email);
    if (user) {
        return next(new AppError_1.AppError("User already exists", 400));
    }
    user = await User_1.User.create({ name, email, password });
    const token = user.generateJwtToken();
    user.password = 'undefined';
    res.status(201).json({ success: true, data: { ...user._doc, token } });
});
