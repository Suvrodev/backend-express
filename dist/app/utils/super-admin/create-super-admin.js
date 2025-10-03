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
const user_model_1 = require("../../modules/user/user.model");
const authGuard_1 = require("../myAuth/authGuard");
const superAdminData = {
    name: "Super Admin",
    email: "suvrodev.cse.77@gmail.com",
    password: "YourStrongPassword123!", // must be at least 8 chars (minlength rule)
    role: authGuard_1.rolesGuard["super-admin"],
    isDeleted: false,
};
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    //when database is connected , we will check is there any user who is super admin or not
    const isSuperAdminExists = yield user_model_1.UserModel.findOne({
        role: authGuard_1.rolesGuard["super-admin"],
    });
    console.log("is Super Admin: ", isSuperAdminExists);
    if (!isSuperAdminExists) {
        yield user_model_1.UserModel.create(superAdminData);
    }
});
exports.default = seedSuperAdmin;
