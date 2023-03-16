import mongoose from "mongoose";

import { IHotelRoomDocument, IHotelRoomModel } from "../types/hotelRoom";

const HotelRoomSchema = new mongoose.Schema<
    IHotelRoomDocument,
    IHotelRoomModel
>(
    {
        title: {
            type: String,
            trimg: true,
            required: [true, "Please provide a title"],
        },
        photo: {
            type: [
                {
                    id: String,
                    url: String,
                },
            ],
            required: [true, "Please provide room photos"],
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        offeredPrice: {
            type: Number,
            required: true,
        },
        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isBooked: {
            type: Boolean,
            default: false,
        },
        isPending: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IHotelRoomDocument, IHotelRoomModel>(
    "HotelRoom",
    HotelRoomSchema
);
