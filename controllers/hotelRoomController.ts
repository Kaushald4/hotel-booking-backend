import { NextFunction, RequestX, Response } from "express";
import HotelRoom from "../models/HotelRoom";
import { AppError } from "../utils/AppError";
import { catchAsyncError } from "../utils/catchAsyncError";
import ImageUpload from "../utils/ImageUpload";

export const createHotelRoom = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const { title, description, price, offeredPrice, manager } = req.body;
        console.log(req.body);

        if (!title || !description || !price || !offeredPrice || !manager) {
            return next(
                new AppError("Please provide all the required fields", 400)
            );
        }
        let images = null;
        if (req.files && req.files.length >= 1) {
            images = await ImageUpload(req.files as []);
        }

        const hotelRoom = await HotelRoom.create({
            title,
            description,
            price,
            offeredPrice,
            manager,
            createdBy: req.user?._id,
            photo: images || [],
        });

        res.status(201).json({ success: true, data: hotelRoom });
    }
);

export const updateHotelRoom = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const { hotelID } = req.params;

        const update: any = { $set: {} };

        let images = null;
        if (req.files && req.files.length >= 1) {
            images = await ImageUpload(req.files as []);
        }

        if (images) {
            if (req.body?.photo) {
                // keep previous images and add new images
                update.$set["photo"] = [...req.body.photo, ...(images as [])];
            } else {
                update.$set["photo"] = images;
            }
        }

        for (let key in req.body) {
            update.$set[key] = req.body[key];
        }

        const updatedHotel = await HotelRoom.findOneAndUpdate(
            { _id: hotelID },
            update,
            { new: true }
        );

        res.status(201).json({ success: true, data: updatedHotel });
    }
);

export const deleteHotelRoom = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const { hotelID } = req.params;

        if (!hotelID) {
            return next(
                new AppError("Please provide hotelID to delete it", 400)
            );
        }

        const deletedHotel = await HotelRoom.findByIdAndDelete({
            _id: hotelID,
        });
        res.status(200).json({
            success: true,
            data: deletedHotel,
            message: "Deleted Successfully...",
        });
    }
);

export const getAllHotelsRoom = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const hotels = await HotelRoom.find();
        res.status(200).json({ success: true, data: hotels });
    }
);

export const getHotelRoomByID = catchAsyncError(
    async (req: RequestX, res: Response, next: NextFunction) => {
        const { roomId } = req.params;
        const hotel = await HotelRoom.find({ _id: roomId });

        res.status(200).json({ success: true, data: hotel });
    }
);
