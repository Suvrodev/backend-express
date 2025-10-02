import express from "express";
import { SubjectControllers } from "./subject.controller";
import auth from "../../middleware/auth/auth";

const router = express.Router();

router.post("/create-subject", SubjectControllers.createSubject);
router.get("/", auth(), SubjectControllers.getAllSubject);
router.get("/:id", SubjectControllers.getSingleSubject);
router.delete("/:id", SubjectControllers.deleteSubject);
router.patch("/:id", SubjectControllers.updateSubject);

export const subjectRoutes = router;
