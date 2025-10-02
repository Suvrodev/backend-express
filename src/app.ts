// const express = require('express')
import express, {
  Application,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import cors from "cors";
import config from "./app/config";
import { studentRoutes } from "./app/modules/students/student.route";
import { subjectRoutes } from "./app/modules/subject/subject.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes/routes";
const app: Application = express();

//Perser For req.body - json
app.use(express.json());
app.use(cors());

//application route
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: `This back end is Listening is on port ${config.port}`,
  });
});

// unhandle rejection
const unhandleRejection: RequestHandler = async (req, res) => {
  Promise.reject();
};

app.get("/uh", unhandleRejection);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
