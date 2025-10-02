import { TErrorScources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Mongo duplicate error theke field & value ber kora
  const field = Object.keys(err.keyValue || {})[0] || "field";
  const value = Object.values(err.keyValue || {})[0] || "value";

  const errorSources: TErrorScources = [
    {
      path: field,
      message: `${field}: ${value} already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Duplicate key error",
    errorSources,
  };
};

export default handleDuplicateError;
