import mongoose from "mongoose";
import { TErrorScources } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorScources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    // message: "Zod Validation error", because ami kon library use korchi bolbo na
    message: "Validation error",
    errorSources,
  };
};

export default handleValidationError;
