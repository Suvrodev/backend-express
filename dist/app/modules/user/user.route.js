"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/reg", user_controller_1.UserControllers.registrationUser);
router.get("/", user_controller_1.UserControllers.getAllUser);
router.get("/:email", user_controller_1.UserControllers.getSingleUser);
router.put("/:email", user_controller_1.UserControllers.deleteUser);
router.patch("/:email", user_controller_1.UserControllers.updateUser);
exports.UserRoutes = router;
