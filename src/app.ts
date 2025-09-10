// const express = require('express')
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./app/config";
import { studentRoutes } from "./app/modules/students/student.route";
const app: Application = express();

//Perser For req.body - json
app.use(express.json());
app.use(cors());

//application route
app.use("/api/student", studentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: `This back end is Listening is on port ${config.port}`,
  });
});

export default app;

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
 * 14. CatchAsyncFunction
 */
