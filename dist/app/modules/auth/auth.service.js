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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const accessToken_1 = require("../../myAuth/accessToken");
const refreshToken_1 = require("../../myAuth/refreshToken");
const checkDeleted_1 = require("../user/userFunction/checkDeleted");
const checkNotExists_1 = require("../user/userFunction/checkNotExists");
// import Jwt from "jsonwebtoken";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("============================");
    console.log("Payloadddd: ", payload);
    //Checking  if the user is exist
    const isUserExists = yield (0, checkNotExists_1.checkNotExists)(payload.email);
    //Check User deleted or not
    const userIsDeleted = yield (0, checkDeleted_1.checkDeleted)(payload.email);
    //Check Password is right or wrong
    // const isPasswordMatched = await bcrypt.compare(
    //   payload?.password,
    //   isUserExists?.password
    // );
    // if (!isPasswordMatched) {
    //   throw new AppError(401, "Password is Incorrect");
    // }
    ///Check Password without bycript (For Don't set forget Password)
    if ((payload === null || payload === void 0 ? void 0 : payload.password) !== (isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password)) {
        throw new AppError_1.default(401, "Password is Incorrect");
    }
    const accessToken = (0, accessToken_1.getAccessToken)(isUserExists);
    const refreshToken = (0, refreshToken_1.getRefreshToken)(isUserExists);
    console.log("Access Token: ", accessToken);
    console.log("Refresh Token: ", refreshToken);
    //Access Granted: Send AccessToken, Refresh Token
    return {
        accessToken,
        refreshToken,
    };
});
/**
 *
 * Get accress token by refresh token
 */
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Refresh token in service: ", token);
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    // verify token
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secreet);
    console.log("decoded: ", decoded);
    const { email } = decoded;
    console.log("email: ");
    const isUserExists = yield (0, checkNotExists_1.checkNotExists)(email);
    console.log("is User Exists: ", isUserExists);
    const accessToken = (0, accessToken_1.getAccessToken)(isUserExists);
    console.log("Access Token: ", accessToken);
    return { accessToken };
});
exports.AuthServices = {
    loginUser,
    refreshToken,
};
