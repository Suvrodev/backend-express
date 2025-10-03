"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./app/config"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const app = (0, express_1.default)();
//Perser For req.body - json
app.use(express_1.default.json());
//cookie parser
app.use((0, cookie_parser_1.default)());
/**
 * Cors
 */
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        console.log("Incoming origin:", origin);
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
//application route
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.json({
        message: `This back end is Listening is on port ${config_1.default.port}`,
    });
});
/**
 *  This unhandle rejection is only for check
 */
// unhandle rejection
const unhandleRejection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Promise.reject();
});
app.get("/uh", unhandleRejection);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
