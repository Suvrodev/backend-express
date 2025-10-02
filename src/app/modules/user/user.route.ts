import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/reg", UserControllers.registrationUser);
router.get("/", UserControllers.getAllUser);
router.get("/:email", UserControllers.getSingleUser);
router.put("/:email", UserControllers.deleteUser);
router.patch("/:email", UserControllers.updateUser);

export const UserRoutes = router;
