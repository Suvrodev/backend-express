// const express = require('express')
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./app/config";
import { studentRoutes } from "./app/modules/students/student.route";
import { subjectRoutes } from "./app/modules/subject/subject.route";
const app: Application = express();

//Perser For req.body - json
app.use(express.json());
app.use(cors());

//application route
app.use("/api/student", studentRoutes);
app.use("/api/subject", subjectRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: `This back end is Listening is on port ${config.port}`,
  });
});

export default app;

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
