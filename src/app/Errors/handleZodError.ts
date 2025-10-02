import { ZodError, ZodIssue } from "zod";
import { TErrorScources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorScources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    // message: "Zod Validation error", because ami kon library use korchi bolbo na
    message: "Validation error",
    errorSources,
  };
};

export default handleZodError;
