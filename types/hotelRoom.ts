import mongoose, { Document, Model } from "mongoose";

interface RoomPhoto {
    id: string;
    url: string;
}

export interface IHotelRoom {
    photo: RoomPhoto[];
    title: string;
    description: string;
    price: number;
    offeredPrice: number;
    manager: string | undefined;
    createdBy: string | undefined;
    isBooked: false;
    isPending: false;
}

export interface IHotelRoomDocument extends IHotelRoom, Document {
    _doc: IHotelRoom;
}

export interface IHotelRoomModel extends Model<IHotelRoomDocument> {}
