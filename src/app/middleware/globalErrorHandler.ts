import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { status } from "http-status";
import { ZodError, ZodIssue } from "zod";
import { TErrorScource } from "../interface/error";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong";

  let errorSources: TErrorScource = [
    {
      path: "",
      message: "Something went wrong from error souces",
    },
  ];

  //Check zod error or not
  /**
   * Make Handler
   */

  const handleZodError = (err: ZodError) => {
    const errorSources: TErrorScource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    statusCode = 400;

    return {
      statusCode,
      // message: "Zod Validation error", because ami kon library use korchi bolbo na
      message: "Validation error",
      errorSources,
    };
  };
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    // console.log("Simplified error: ", simplifiedError);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? err?.stack : null,
    previousError: err,
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
