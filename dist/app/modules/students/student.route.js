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
exports.studentRoutes = router;
/**
 * 1. Block and delete student asbe na
 * 2. Delete and Update
 * 3. Roll back r ekta ki jeno ache
 * 4.R ekta ki jeno ache
 * 5. Route
 * 6. ROute not found
 * 7.App Error
 * 8. Global Error
 * 9.
 */
