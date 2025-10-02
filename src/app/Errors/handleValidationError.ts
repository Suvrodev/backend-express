import mongoose from "mongoose";
import { TErrorScources, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorScources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    }
  );

  const statusCode = 400;
  const heyError = "Tomake ki send kote parbo?";
  return {
    statusCode,
    // message: "Zod Validation error", because ami kon library use korchi bolbo na
    message: "Validation error",
    errorSources,
  };
};

export default handleValidationError;
