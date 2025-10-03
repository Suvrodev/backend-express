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
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth = (...reqRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("bearer token: ", req.headers);
        const extractedToken = req.headers.authorization;
        console.log("Extracted token: ", extractedToken);
        const token = extractedToken === null || extractedToken === void 0 ? void 0 : extractedToken.split(" ")[1];
        console.log("Token: ", token);
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not Authorized");
        }
        // verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secreet);
        console.log("decoded: ", decoded);
        if (decoded) {
            req.user = decoded;
        }
        console.log("Require roles: ", reqRoles);
        if (reqRoles.length && !reqRoles.includes(decoded === null || decoded === void 0 ? void 0 : decoded.role)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You have not access");
        }
        next();
    }));
};
exports.default = auth;
