import status from "http-status";
import config from "../../config";
import AppError from "../../Errors/AppError";
import { getAccessToken } from "../../myAuth/accessToken";
import { getRefreshToken } from "../../myAuth/refreshToken";
import { UserModel } from "../user/user.model";
import { checkDeleted } from "../user/userFunction/checkDeleted";
import { checkNotExists } from "../user/userFunction/checkNotExists";
import { TLoginUser } from "./auth.interface";
// import Jwt from "jsonwebtoken";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  console.log("============================");
  console.log("Payloadddd: ", payload);

  //Checking  if the user is exist
  const isUserExists = await checkNotExists(payload.email);

  //Check User deleted or not
  const userIsDeleted = await checkDeleted(payload.email);

  //Check Password is right or wrong
  // const isPasswordMatched = await bcrypt.compare(
  //   payload?.password,
  //   isUserExists?.password
  // );
  // if (!isPasswordMatched) {
  //   throw new AppError(401, "Password is Incorrect");
  // }

  ///Check Password without bycript (For Don't set forget Password)
  if (payload?.password !== isUserExists?.password) {
    throw new AppError(401, "Password is Incorrect");
  }

  const accessToken = getAccessToken(isUserExists);
  const refreshToken = getRefreshToken(isUserExists);
  console.log("Access Token: ", accessToken);
  console.log("Refresh Token: ", refreshToken);
  //Access Granted: Send AccessToken, Refresh Token

  return {
    accessToken,
    refreshToken,
  };
};

/**
 *
 * Get accress token by refresh token
 */

const refreshToken = async (token: string) => {
  console.log("Refresh token in service: ", token);
  if (!token) {
    throw new AppError(status.UNAUTHORIZED, "You are not authorized");
  }

  // verify token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secreet as string
  ) as JwtPayload;

  console.log("decoded: ", decoded);
  const { email } = decoded;
  console.log("email: ");
  const isUserExists = await checkNotExists(email);
  console.log("is User Exists: ", isUserExists);
  const accessToken = getAccessToken(isUserExists);
  console.log("Access Token: ", accessToken);

  return { accessToken };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
