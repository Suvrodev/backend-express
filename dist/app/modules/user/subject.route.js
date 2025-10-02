"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const subject_controller_1 = require("./subject.controller");
const router = express_1.default.Router();
router.post("/create-subject", subject_controller_1.SubjectControllers.createSubject);
router.get("/", subject_controller_1.SubjectControllers.getAllSubject);
router.get("/:id", subject_controller_1.SubjectControllers.getSingleSubject);
router.delete("/:id", subject_controller_1.SubjectControllers.deleteSubject);
router.patch("/:id", subject_controller_1.SubjectControllers.updateSubject);
exports.subjectRoutes = router;
