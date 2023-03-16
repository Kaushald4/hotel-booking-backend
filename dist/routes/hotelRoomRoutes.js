"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../uploads/"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now());
    },
});
const upload = (0, multer_1.default)({ storage });
const hotelRoomController_1 = require("../controllers/hotelRoomController");
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
router.post("/room/create", isLoggedIn_1.isLoggedIn, upload.array("room_photos"), hotelRoomController_1.createHotelRoom);
router.delete("/room/delete/:hotelID", isLoggedIn_1.isLoggedIn, hotelRoomController_1.deleteHotelRoom);
router.put("/room/update/:hotelID", isLoggedIn_1.isLoggedIn, upload.array("room_photos"), hotelRoomController_1.updateHotelRoom);
router.get("/room/get", isLoggedIn_1.isLoggedIn, hotelRoomController_1.getAllHotelsRoom);
router.get("/room/get/:roomId", isLoggedIn_1.isLoggedIn, hotelRoomController_1.getHotelRoomByID);
exports.default = router;
