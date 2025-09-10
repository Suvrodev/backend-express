import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

router.post("/create-student", studentControllers.createStudent);
router.get("/", studentControllers.getAllStudent);
router.get("/:email", studentControllers.getSingleStudent);
router.delete("/:email", studentControllers.deleteStudent);
router.patch("/:email", studentControllers.updateStudent);

export const studentRoutes = router;
