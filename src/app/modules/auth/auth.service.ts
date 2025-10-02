import AppError from "../../Errors/AppError";
import { UserModel } from "../user/user.model";
import { checkDeleted } from "../user/userFunction/checkDeleted";
import { checkNotExists } from "../user/userFunction/checkNotExists";
import { TLoginUser } from "./auth.interface";

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

  // console.log("is User exists----: ", isUserExists);
  //Create Token and send to the client
  //   const jwtPayload = {
  //     _id: isUserExists._id,
  //     firstName: isUserExists?.firstName,
  //     lastName: isUserExists?.lastName,
  //     email: isUserExists?.email,
  //     role: isUserExists?.role,
  //     isBlocked: isUserExists?.isBlocked,
  //     phone: isUserExists?.phone,
  //     image: isUserExists?.image,
  //   };
  //   const accessToken = Jwt.sign(jwtPayload, config.jwt_access_token as string, {
  //     expiresIn: "30d",
  //   });
  //   console.log("JwtPayload: ", jwtPayload);
  //Access Granted: Send AccessToken, Refresh Token

  const accessToken = "";
  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
