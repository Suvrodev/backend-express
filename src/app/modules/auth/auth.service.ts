import config from "../../config";
import AppError from "../../Errors/AppError";
import { getAccessToken } from "../../middleware/auth/accessToken";
import { UserModel } from "../user/user.model";
import { checkDeleted } from "../user/userFunction/checkDeleted";
import { checkNotExists } from "../user/userFunction/checkNotExists";
import { TLoginUser } from "./auth.interface";
// import Jwt from "jsonwebtoken";
import jwt from "jsonwebtoken";

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
  console.log("Access Token: ", accessToken);
  //Access Granted: Send AccessToken, Refresh Token

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
