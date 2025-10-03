import express from "express";
import { studentControllers } from "./student.controller";
import auth from "../../middleware/auth/auth";
import { rolesGuard } from "../../utils/myAuth/authGuard";

const router = express.Router();

router.post(
  "/create-student",
  auth(rolesGuard.admin, rolesGuard["super-admin"]),
  studentControllers.createStudent
);
router.get("/", auth(), studentControllers.getAllStudent);
router.get("/:email", studentControllers.getSingleStudent);
router.put("/:email", studentControllers.deleteStudent);
router.patch("/:email", studentControllers.updateStudent);

export const studentRoutes = router;
