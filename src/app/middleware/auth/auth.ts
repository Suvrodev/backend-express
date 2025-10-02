import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../Errors/AppError";
import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const extractedToken = req.headers.authorization;
    console.log("Extracted token: ", extractedToken);

    const token = (extractedToken as string).split(" ")[1];
    console.log("Token===: ", token);
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "You are not Authorized");
    }

    // verify a token
    jwt.verify(
      token,
      config.jwt_access_secreet as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(status.UNAUTHORIZED, "You are not Authorized");
        }
        console.log("Decoded: ", decoded);
        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};

export default auth;
