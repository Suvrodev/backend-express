// const express = require('express')
import express, {
  Application,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./app/config";

import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes/routes";
const app: Application = express();

//Perser For req.body - json
app.use(express.json());
//cookie parser
app.use(cookieParser());

app.use(cors());

//application route
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: `This back end is Listening is on port ${config.port}`,
  });
});

/**
 *  This unhandle rejection is only for check
 */
// unhandle rejection
const unhandleRejection: RequestHandler = async (req, res) => {
  Promise.reject();
};

app.get("/uh", unhandleRejection);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
