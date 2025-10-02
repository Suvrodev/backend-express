import { Router } from "express";
import { studentRoutes } from "../modules/students/student.route";
import { subjectRoutes } from "../modules/subject/subject.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
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
