import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { status } from "http-status";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import handleZodError from "../Errors/handleZodError";
import { TErrorScources } from "../interface/error";
import handleValidationError from "../Errors/validationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong";

  let errorSources: TErrorScources = [
    {
      path: "",
      message: "Something went wrong from error souces",
    },
  ];

  ///Check Error Type
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    // console.log("Simplified error: ", simplifiedError);
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
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
