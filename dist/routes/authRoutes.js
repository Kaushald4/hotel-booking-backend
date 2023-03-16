"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const isLoggedIn_1 = require("../middlewares/isLoggedIn");
const router = express_1.default.Router();
router.post("/auth/signup", authController_1.signup);
router.post("/auth/login", authController_1.login);
router.get("/auth/me", isLoggedIn_1.isLoggedIn, authController_1.getLogginInUser);
router.get("/users", isLoggedIn_1.isLoggedIn, authController_1.getAllUsers);
exports.default = router;
