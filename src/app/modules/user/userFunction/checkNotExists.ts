import AppError from "../../../Errors/AppError";
import { UserModel } from "../user.model";

export const checkNotExists = async (email: string) => {
  const res = await UserModel.findOne({ email: email }).select("+password");
  console.log("checkNotExists res: ", res);

  if (!res) {
    throw new AppError(404, "User is not exists");
  }
  return res;
};
