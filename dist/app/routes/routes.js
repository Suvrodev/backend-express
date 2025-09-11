"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = require("../modules/students/student.route");
const subject_route_1 = require("../modules/subject/subject.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/student",
        route: student_route_1.studentRoutes,
    },
    {
        path: "/subject",
        route: subject_route_1.subjectRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
