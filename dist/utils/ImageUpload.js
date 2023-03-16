"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const unlinkAsync = (0, util_1.promisify)(fs_1.default.unlink);
const ImageUpload = async (files) => {
    return new Promise(async (resolve, reject) => {
        try {
            const images = [];
            for (let i = 0; i < files.length; i++) {
                const image = await cloudinary_1.v2.uploader.upload(files[i].path, { upload_preset: "hotel_booking" });
                images.push({ url: image.secure_url, id: image.public_id });
            }
            // delete image from local disk
            for await (let file of files) {
                await unlinkAsync(file.path);
            }
            resolve(images);
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.default = ImageUpload;
