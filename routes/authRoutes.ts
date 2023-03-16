import express from "express";
import {
    getAllUsers,
    getLogginInUser,
    login,
    signup,
} from "../controllers/authController";
import { isLoggedIn } from "../middlewares/isLoggedIn";
const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/auth/me", isLoggedIn, getLogginInUser);
router.get("/users", isLoggedIn, getAllUsers);

export default router;
