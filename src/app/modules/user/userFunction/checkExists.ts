import AppError from "../../../Errors/AppError";
import { UserModel } from "../user.model";

export const checkExists = async (email: string) => {
  const res = await UserModel.findOne({ email: email });
  console.log("Check Exists res: ", res);
  if (res) {
    throw new AppError(409, "User already Exists");
  }
  return res;
};
