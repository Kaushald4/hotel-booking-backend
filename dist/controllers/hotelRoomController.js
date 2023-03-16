"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelRoomByID = exports.getAllHotelsRoom = exports.deleteHotelRoom = exports.updateHotelRoom = exports.createHotelRoom = void 0;
const HotelRoom_1 = __importDefault(require("../models/HotelRoom"));
const AppError_1 = require("../utils/AppError");
const catchAsyncError_1 = require("../utils/catchAsyncError");
const ImageUpload_1 = __importDefault(require("../utils/ImageUpload"));
exports.createHotelRoom = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { title, description, price, offeredPrice, manager } = req.body;
    console.log(req.body);
    if (!title || !description || !price || !offeredPrice || !manager) {
        return next(new AppError_1.AppError("Please provide all the required fields", 400));
    }
    let images = null;
    if (req.files && req.files.length >= 1) {
        images = await (0, ImageUpload_1.default)(req.files);
    }
    const hotelRoom = await HotelRoom_1.default.create({
        title,
        description,
        price,
        offeredPrice,
        manager,
        createdBy: req.user?._id,
        photo: images || [],
    });
    res.status(201).json({ success: true, data: hotelRoom });
});
exports.updateHotelRoom = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { hotelID } = req.params;
    const update = { $set: {} };
    let images = null;
    if (req.files && req.files.length >= 1) {
        images = await (0, ImageUpload_1.default)(req.files);
    }
    if (images) {
        if (req.body?.photo) {
            // keep previous images and add new images
            update.$set["photo"] = [...req.body.photo, ...images];
        }
        else {
            update.$set["photo"] = images;
        }
    }
    for (let key in req.body) {
        update.$set[key] = req.body[key];
    }
    const updatedHotel = await HotelRoom_1.default.findOneAndUpdate({ _id: hotelID }, update, { new: true });
    res.status(201).json({ success: true, data: updatedHotel });
});
exports.deleteHotelRoom = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { hotelID } = req.params;
    if (!hotelID) {
        return next(new AppError_1.AppError("Please provide hotelID to delete it", 400));
    }
    const deletedHotel = await HotelRoom_1.default.findByIdAndDelete({
        _id: hotelID,
    });
    res.status(200).json({
        success: true,
        data: deletedHotel,
        message: "Deleted Successfully...",
    });
});
exports.getAllHotelsRoom = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const hotels = await HotelRoom_1.default.find();
    res.status(200).json({ success: true, data: hotels });
});
exports.getHotelRoomByID = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { roomId } = req.params;
    const hotel = await HotelRoom_1.default.find({ _id: roomId });
    res.status(200).json({ success: true, data: hotel });
});
