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
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
//Login User
const loginUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req.body);
    const { refreshToken } = result;
    res.cookie("_backEnd_refresh", refreshToken, {
        // secure: config.node_env === "production",
        secure: true,
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Login successful",
        statusCode: 200,
        data: {
            accessToken: result === null || result === void 0 ? void 0 : result.accessToken,
            refreshToken: result === null || result === void 0 ? void 0 : result.refreshToken,
        },
    });
}));
//Get Access Token by redresh token
const refreshToken = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("in cookies: ", req.cookies);
    const result = yield auth_service_1.AuthServices.refreshToken((_a = req.cookies) === null || _a === void 0 ? void 0 : _a._backEnd_refresh);
    res.status(200).json({
        success: true,
        message: "Generate Access token successfully",
        statusCode: 200,
        data: result,
    });
}));
exports.AuthControllers = {
    loginUser,
    refreshToken,
};
