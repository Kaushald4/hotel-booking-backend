import mongoose, { Document, Model } from "mongoose";

export interface IBooking {
    hotelRoomId: string | undefined;
    bookedBy: string | undefined;
    bookedAt: Date;
    isBooked: Boolean;
    cancelledAt: Date;
    isCancelled: Boolean;
    bookingDate: {
        from: Date;
        to: Date;
    };
    isConfirmed: Boolean;
}

export interface IBookingDocument extends IBooking, Document {
    _doc: IBooking;
}

export interface IBookingModel extends Model<IBookingDocument> {}
