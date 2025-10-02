import AppError from "../../../Errors/AppError";
import { UserModel } from "../user.model";

export const NotExistsOrDeleted = async (email: string) => {
  const userRes = await UserModel.findOne({ email: email });
  console.log("user res: ", userRes);

  if (!userRes) {
    throw new AppError(404, "User is not exists");
  }
  if (userRes?.isDeleted) {
    throw new AppError(409, "User already deleted");
  }
};
