import { UserModel } from "../user.model";

export const checkExistUser = async (email: string) => {
  const res = await UserModel.findOne({ email: email });
  return res;
};
