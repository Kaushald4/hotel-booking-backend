import { NextFunction, RequestX, Response } from "express";
import Booking from "../models/Booking";
import HotelRoom from "../models/HotelRoom";
import { AppError } from "../utils/AppError";
import { catchAsyncError } from "../utils/catchAsyncError";

export const bookHotelRoom = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const { hotelRoomId, price, offeredPrice, fromDate, toDate } = req.body;

        if (!price || !offeredPrice) {
            return next(
                new AppError("Please provide all the required fields", 400)
            );
        }

        const hotelRoom = await Booking.create({
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

        await HotelRoom.findOneAndUpdate(
            { _id: hotelRoomId },
            { isPending: true }
        );

        res.status(201).json({ success: true, data: hotelRoom });
    }
);

export const getBookings = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const bookings = await Booking.find().populate("bookedBy hotelRoomId");

        res.status(200).json({ success: true, data: bookings });
    }
);

export const getUserBookings = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const bookings = await Booking.find({
            bookedBy: req.user?._id,
        }).populate("bookedBy hotelRoomId");
        res.status(200).json({ success: true, data: bookings });
    }
);

export const approveBooking = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const { bookingId } = req.params;
        const booking = await Booking.findOneAndUpdate(
            { _id: bookingId },
            { isBooked: true, isConfirmed: true },
            { new: true }
        ).populate("bookedBy hotelRoomId");

        if (booking) {
            let book: any = booking;
            await HotelRoom.findByIdAndUpdate(
                { _id: book!.hotelRoomId!._id },
                { isBooked: true, isPending: false }
            );
        }

        res.status(200).json({ success: true, data: booking });
    }
);

export const rejectBooking = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const { bookingId, hotelId } = req.params;
        const hotel = await HotelRoom.findOneAndUpdate(
            { _id: hotelId },
            { isPending: false, isBooked: false }
        );
        const booking = await Booking.findOneAndDelete({
            _id: bookingId,
        }).populate("bookedBy hotelRoomId");

        res.status(200).json({ success: true, data: booking });
    }
);

export const cancelMyBooking = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const { bookingId, hotelId } = req.params;
        const myBooking = await Booking.findOne({ _id: bookingId });

        if (myBooking?.bookedBy?.toString() !== req.user?._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to cancel this booking",
            });
        }

        const hotel = await HotelRoom.findOneAndUpdate(
            { _id: hotelId },
            { isPending: false, isBooked: false }
        );
        const booking = await Booking.findOneAndDelete({
            _id: bookingId,
        }).populate("bookedBy hotelRoomId");

        res.status(200).json({ success: true, data: booking });
    }
);
