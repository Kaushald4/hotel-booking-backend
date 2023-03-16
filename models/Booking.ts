import mongoose, { Schema } from "mongoose";
import { IBookingDocument, IBookingModel } from "../types/booking";
const { ObjectId } = Schema.Types;

const HotelRoomBookingSchema = new Schema<IBookingDocument, IBookingModel>(
    {
        hotelRoomId: {
            type: ObjectId,
            ref: "HotelRoom",
        },
        bookedBy: {
            type: ObjectId,
            ref: "User",
        },
        bookedAt: {
            type: Date,
            default: new Date(),
        },
        isBooked: {
            type: Boolean,
            default: false,
        },
        cancelledAt: {
            type: Date,
        },
        isCancelled: {
            type: Boolean,
            default: false,
        },
        isConfirmed: {
            type: Boolean,
            default: false,
        },
        bookingDate: {
            from: {
                type: Date,
            },
            to: {
                type: Date,
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model<IBookingDocument, IBookingModel>(
    "Booking",
    HotelRoomBookingSchema
);
