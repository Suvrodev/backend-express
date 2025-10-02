import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const registrationUser = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const result = await UserServices.registrationUserIntoDB(userData);

  res.status(200).json({
    success: true,
    message: "User Registration Successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  res.status(200).json({
    success: true,
    message: "All Users Retrive Successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getSingleUserFromDB(email);
  res.status(200).json({
    success: true,
    message: "User Retrive Successfully",
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await UserServices.deleteUserFromDB(email);
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { email } = req.params;
  const userData = req.body;
  const result = await UserServices.updateUserFromDB(email, userData);
  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    data: result,
  });
});

export const UserControllers = {
  registrationUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
};
