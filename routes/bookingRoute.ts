import express from "express";
import {
    approveBooking,
    bookHotelRoom,
    cancelMyBooking,
    getBookings,
    getUserBookings,
    rejectBooking,
} from "../controllers/bookingController";
import { isLoggedIn } from "../middlewares/isLoggedIn";
const router = express.Router();

router.post("/room/book", isLoggedIn, bookHotelRoom);
router.get("/room/bookings", isLoggedIn, getBookings);
router.patch("/room/booking/approve/:bookingId", isLoggedIn, approveBooking);
router.delete(
    "/room/booking/reject/:bookingId/:hotelId",
    isLoggedIn,
    rejectBooking
);
router.get("/room/bookings/me", isLoggedIn, getUserBookings);
router.delete(
    "/room/bookings/cancel/:bookingId/:hotelId",
    isLoggedIn,
    cancelMyBooking
);

export default router;
