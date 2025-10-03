import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../Errors/AppError";
import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const auth = (...reqRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("bearer token: ", req.headers);
    const extractedToken = req.headers.authorization;
    console.log("Extracted token: ", extractedToken);

    const token = (extractedToken as string)?.split(" ")[1];
    console.log("Token: ", token);
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "You are not Authorized");
    }

    // verify a token
    // jwt.verify(
    //   token,
    //   config.jwt_access_secreet as string,
    //   function (err, decoded) {
    //     if (err) {
    //       throw new AppError(status.UNAUTHORIZED, "You are not Authorized");
    //     }
    //     console.log("Decoded: ", decoded);
    //     req.user = decoded as JwtPayload;
    //     next();
    //   }
    // );

    // verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secreet as string
    ) as JwtPayload;

    console.log("decoded: ", decoded);
    if (decoded) {
      req.user = decoded as JwtPayload;
    }
    console.log("Require roles: ", reqRoles);

    if (reqRoles.length && !reqRoles.includes(decoded?.role)) {
      throw new AppError(status.FORBIDDEN, "You have not access");
    }
    next();
  });
};

export default auth;
