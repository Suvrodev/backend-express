import AppError from "../../../Errors/AppError";
import { UserModel } from "../user.model";

export const checkDeleted = async (email: string) => {
  const res = await UserModel.findOne({ email });
  if (res?.isDeleted) {
    throw new AppError(409, "User is Deleted");
  }
};
