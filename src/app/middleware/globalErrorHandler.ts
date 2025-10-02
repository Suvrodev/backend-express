import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { status } from "http-status";
import { ZodError, ZodIssue } from "zod";
import config from "../config";
import handleZodError from "../Errors/handleZodError";
import { TErrorScources } from "../interface/error";
import handleValidationError from "../Errors/handleValidationError";
import handleCastError from "../Errors/handleCastError";
import handleDuplicateError from "../Errors/handleDuplicateError";
import AppError from "../Errors/AppError";

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

  /**
   * Handle Error
   */

  //Zod Error
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    // console.log("Simplified error: ", simplifiedError);
  }
  //Mongoose validation error according to model
  else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  //Mongoose Cast error according to model (mainly used in get specific data by _id)
  else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  //duplicate id/email error
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  //Error of Our App Error
  else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
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
