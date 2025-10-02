import mongoose from "mongoose";
import { TErrorScources, TGenericErrorResponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorScources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation error (cast)",
    errorSources,
  };
};

export default handleCastError;
