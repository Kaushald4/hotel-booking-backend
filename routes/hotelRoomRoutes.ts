import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now());
    },
});
const upload = multer({ storage });

import {
    createHotelRoom,
    deleteHotelRoom,
    getAllHotelsRoom,
    getHotelRoomByID,
    updateHotelRoom,
} from "../controllers/hotelRoomController";
import { isLoggedIn } from "../middlewares/isLoggedIn";

router.post(
    "/room/create",
    isLoggedIn,
    upload.array("room_photos"),
    createHotelRoom
);
router.delete("/room/delete/:hotelID", isLoggedIn, deleteHotelRoom);
router.put(
    "/room/update/:hotelID",
    isLoggedIn,
    upload.array("room_photos"),
    updateHotelRoom
);
router.get("/room/get", isLoggedIn, getAllHotelsRoom);
router.get("/room/get/:roomId", isLoggedIn, getHotelRoomByID);

export default router;
