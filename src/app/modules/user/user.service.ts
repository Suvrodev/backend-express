import mongoose from "mongoose";
import { StudentModel } from "../students/student.model";
import AppError from "../../Errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { checkUserDeleteOrNot } from "./userFunction/checkUserDeleteOrNot";
import { NotExistsOrDeleted } from "./userFunction/NotExistsOrDeleted";
import { checkNotExists } from "./userFunction/checkNotExists";
import { checkExists } from "./userFunction/checkExists";

const registrationUserIntoDB = async (user: TUser) => {
  console.log("User in service reg: ", user);

  const userExistance = await checkExists(user.email);

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
  const existsRes = await checkNotExists(email);

  const res = await UserModel.findOneAndUpdate(
    { email: email },
    { isDeleted: true },
    {
      new: true,
      runValidators: true, //Model er role use korbe
    }
  );
};
const updateUserFromDB = async (email: string, userData: Partial<TUser>) => {
  const deleteOrNotExistsRes = await NotExistsOrDeleted(email);
  console.log("deleteOrNotExistsRes:  ", deleteOrNotExistsRes);

  const res = await UserModel.findOneAndUpdate(
    { email: email },
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
