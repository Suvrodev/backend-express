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

/**
 * Cors
 */
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming origin:", origin);
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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
