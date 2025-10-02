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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const NotExistsOrDeleted_1 = require("./userFunction/NotExistsOrDeleted");
const checkNotExists_1 = require("./userFunction/checkNotExists");
const checkExists_1 = require("./userFunction/checkExists");
const registrationUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User in service reg: ", user);
    const userExistance = yield (0, checkExists_1.checkExists)(user.email);
    const res = yield user_model_1.UserModel.create(user);
    return res;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // throw new AppError(404, "Not FOund");
    const res = yield user_model_1.UserModel.find();
    return res;
});
const getSingleUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.UserModel.findOne({ email: email });
    return res;
});
const deleteUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existsRes = yield (0, checkNotExists_1.checkNotExists)(email);
    const res = yield user_model_1.UserModel.findOneAndUpdate({ email: email }, { isDeleted: true }, {
        new: true,
        runValidators: true, //Model er role use korbe
    });
});
const updateUserFromDB = (email, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteOrNotExistsRes = yield (0, NotExistsOrDeleted_1.NotExistsOrDeleted)(email);
    console.log("deleteOrNotExistsRes:  ", deleteOrNotExistsRes);
    const res = yield user_model_1.UserModel.findOneAndUpdate({ email: email }, { $set: userData }, {
        new: true,
        runValidators: true, //Model er role use korbe
    });
    return res;
});
exports.UserServices = {
    registrationUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserFromDB,
};
