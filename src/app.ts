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
