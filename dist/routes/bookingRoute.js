"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
const router = express_1.default.Router();
router.post("/room/book", isLoggedIn_1.isLoggedIn, bookingController_1.bookHotelRoom);
router.get("/room/bookings", isLoggedIn_1.isLoggedIn, bookingController_1.getBookings);
router.patch("/room/booking/approve/:bookingId", isLoggedIn_1.isLoggedIn, bookingController_1.approveBooking);
router.delete("/room/booking/reject/:bookingId/:hotelId", isLoggedIn_1.isLoggedIn, bookingController_1.rejectBooking);
router.get("/room/bookings/me", isLoggedIn_1.isLoggedIn, bookingController_1.getUserBookings);
router.delete("/room/bookings/cancel/:bookingId/:hotelId", isLoggedIn_1.isLoggedIn, bookingController_1.cancelMyBooking);
exports.default = router;
