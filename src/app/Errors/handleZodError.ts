import { ZodError, ZodIssue } from "zod";
import { TErrorScource } from "../interface/error";

const handleZodError = (err: ZodError) => {
  const errorSources: TErrorScource = err.issues.map((issue: ZodIssue) => {
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
