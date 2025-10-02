import mongoose from "mongoose";
import { StudentModel } from "../students/student.model";
import AppError from "../../Errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { checkExistUser } from "./userFunction/checkExistUser";

const registrationUserIntoDB = async (user: TUser) => {
  console.log("User in service reg: ", user);

  const userExistance = await checkExistUser(user.email);
  console.log("User existance: ", userExistance);

  if (userExistance) {
    throw new AppError(409, "User ALready Exists");
  }
  const res = await UserModel.create(user);
  return res;
};

const getAllUserFromDB = async () => {
  // throw new AppError(404, "Not FOund");
  const res = await UserModel.find();
  return res;
};

const getSingleUserFromDB = async (email: string) => {
  const res = await UserModel.findOne({ email: email });
  return res;
};

const deleteUserFromDB = async (email: string) => {
  const res = await UserModel.findOneAndUpdate(
    { email: email },
    { isDeleted: true },
    {
      new: true,
      runValidators: true, //Model er role use korbe
    }
  );
};
const updateUserFromDB = async (id: string, userData: Partial<TUser>) => {
  const res = await UserModel.findOneAndUpdate(
    { _id: id },
    { $set: userData },
    {
      new: true,
      runValidators: true, //Model er role use korbe
    }
  );

  return res;
};

export const UserServices = {
  registrationUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
};
