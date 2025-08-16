import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

router.post("/create-student", studentControllers.createStudent);
router.get("/", studentControllers.getAllStudent);
router.get("/:email", studentControllers.getSingleStudent);

export const studentRoutes = router;

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
