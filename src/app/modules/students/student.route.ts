import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

router.post("/create-student", studentControllers.createStudent);
router.get("/", studentControllers.getAllStudent);
router.get("/:email", studentControllers.getSingleStudent);
router.delete("/:email", studentControllers.deleteStudent);
router.patch("/:email", studentControllers.updateStudent);

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
 * 9. send email
 * 10. Image
 * 11. Refresh token
 * 12. Access token
 * 13.Password
 */
