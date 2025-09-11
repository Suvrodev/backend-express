"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./app/config"));
const student_route_1 = require("./app/modules/students/student.route");
const subject_route_1 = require("./app/modules/subject/subject.route");
const globalErrorHandler_1 = __importDefault(require("./app/modules/middleware/globalErrorHandler"));
const app = (0, express_1.default)();
//Perser For req.body - json
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application route
app.use("/api/student", student_route_1.studentRoutes);
app.use("/api/subject", subject_route_1.subjectRoutes);
app.get("/", (req, res) => {
    res.json({
        message: `This back end is Listening is on port ${config_1.default.port}`,
    });
});
app.use(globalErrorHandler_1.default);
exports.default = app;
/**
 * 1. Block and delete student asbe na ---------------------
 * 2. Delete and Update
 * 3. Roll back
 * 4. Populate
 * 5. Route
 * 6. ROute not found
 * 7. App Error
 * 8. Global Error
 * 9. send email
 * 10. Image
 * 11. Refresh token
 * 12. Access token
 * 13.Password---------------------------
 * 14. CatchAsyncFunction
 * 15. Delete student asbe na by instance------------------------
 * 16. By Static-------------------------
 * 17. Delete student asbe na and user already exists by middleware------------------------
 * 18. Check User or admin in route
 * 19. app er bhitor error solve
 */
