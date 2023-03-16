"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const HotelRoomSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("HotelRoom", HotelRoomSchema);
