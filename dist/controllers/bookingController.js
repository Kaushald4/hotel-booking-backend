"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelMyBooking = exports.rejectBooking = exports.approveBooking = exports.getUserBookings = exports.getBookings = exports.bookHotelRoom = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const HotelRoom_1 = __importDefault(require("../models/HotelRoom"));
const AppError_1 = require("../utils/AppError");
const catchAsyncError_1 = require("../utils/catchAsyncError");
exports.bookHotelRoom = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { hotelRoomId, price, offeredPrice, fromDate, toDate } = req.body;
    if (!price || !offeredPrice) {
        return next(new AppError_1.AppError("Please provide all the required fields", 400));
    }
    const hotelRoom = await Booking_1.default.create({
        hotelRoomId,
        price,
        offeredPrice,
        bookedBy: req.user?._id,
        bookedAt: new Date(),
        isBooked: false,
        bookingDate: {
            from: fromDate,
            to: toDate,
        },
    });
    await HotelRoom_1.default.findOneAndUpdate({ _id: hotelRoomId }, { isPending: true });
    res.status(201).json({ success: true, data: hotelRoom });
});
exports.getBookings = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const bookings = await Booking_1.default.find().populate("bookedBy hotelRoomId");
    res.status(200).json({ success: true, data: bookings });
});
exports.getUserBookings = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const bookings = await Booking_1.default.find({
        bookedBy: req.user?._id,
    }).populate("bookedBy hotelRoomId");
    res.status(200).json({ success: true, data: bookings });
});
exports.approveBooking = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { bookingId } = req.params;
    const booking = await Booking_1.default.findOneAndUpdate({ _id: bookingId }, { isBooked: true, isConfirmed: true }, { new: true }).populate("bookedBy hotelRoomId");
    if (booking) {
        let book = booking;
        await HotelRoom_1.default.findByIdAndUpdate({ _id: book.hotelRoomId._id }, { isBooked: true, isPending: false });
    }
    res.status(200).json({ success: true, data: booking });
});
exports.rejectBooking = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { bookingId, hotelId } = req.params;
    const hotel = await HotelRoom_1.default.findOneAndUpdate({ _id: hotelId }, { isPending: false, isBooked: false });
    const booking = await Booking_1.default.findOneAndDelete({
        _id: bookingId,
    }).populate("bookedBy hotelRoomId");
    res.status(200).json({ success: true, data: booking });
});
exports.cancelMyBooking = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const { bookingId, hotelId } = req.params;
    const myBooking = await Booking_1.default.findOne({ _id: bookingId });
    if (myBooking?.bookedBy?.toString() !== req.user?._id.toString()) {
        return res.status(400).json({
            success: false,
            message: "You are not authorized to cancel this booking",
        });
    }
    const hotel = await HotelRoom_1.default.findOneAndUpdate({ _id: hotelId }, { isPending: false, isBooked: false });
    const booking = await Booking_1.default.findOneAndDelete({
        _id: bookingId,
    }).populate("bookedBy hotelRoomId");
    res.status(200).json({ success: true, data: booking });
});
