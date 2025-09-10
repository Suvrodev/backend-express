"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
router.post("/create-student", student_controller_1.studentControllers.createStudent);
router.get("/", student_controller_1.studentControllers.getAllStudent);
router.get("/:email", student_controller_1.studentControllers.getSingleStudent);
router.delete("/:email", student_controller_1.studentControllers.deleteStudent);
router.patch("/:email", student_controller_1.studentControllers.updateStudent);
exports.studentRoutes = router;
