import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { status } from "http-status";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong";

  type TErrorScource = {
    path: string | number;
    message: string;
  }[];

  let errorSources: TErrorScource = [
    {
      path: "",
      message: "Something went wrong from error souces",
    },
  ];

  //Check zod error or not
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Fuck Fucku fuck fuck by zod";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: err,
  });
};

export default globalErrorHandler;

/**
 * Pattern:
 * success
 * message
 * errorSources:[
 *  path:
 *  message:
 * ]
 * stack
 */
