"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
const errorController_1 = __importDefault(require("./controllers/errorController"));
// app middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
// app routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const hotelRoomRoutes_1 = __importDefault(require("./routes/hotelRoomRoutes"));
const bookingRoute_1 = __importDefault(require("./routes/bookingRoute"));
// routes middleware
app.use("/api/v1", authRoutes_1.default);
app.use("/api/v1", hotelRoomRoutes_1.default);
app.use("/api/v1", bookingRoute_1.default);
// Golbal Error Handler
app.use(errorController_1.default);
