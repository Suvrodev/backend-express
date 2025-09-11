import { Router } from "express";
import { studentRoutes } from "../modules/students/student.route";
import { subjectRoutes } from "../modules/subject/subject.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/student",
    route: studentRoutes,
  },
  {
    path: "/subject",
    route: subjectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
