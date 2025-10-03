"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const getRefreshToken = (user) => {
    //Create Token and send to the client
    const jwtPayload = {
        _id: user._id,
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secreet, {
        expiresIn: "30d",
        //  expiresIn: "1m",
        // expiresIn: "20s",
    });
    console.log("JwtPayload: ", jwtPayload);
    return accessToken;
};
exports.getRefreshToken = getRefreshToken;
// require("crypto").randomBytes(64).toString("hex");
