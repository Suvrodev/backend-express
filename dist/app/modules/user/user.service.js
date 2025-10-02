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
const registrationUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User in service reg: ", user);
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
    const res = yield user_model_1.UserModel.findOneAndUpdate({ email: email }, { isDeleted: true }, {
        new: true,
        runValidators: true, //Model er role use korbe
    });
});
const updateUserFromDB = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.UserModel.findOneAndUpdate({ _id: id }, { $set: userData }, {
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
