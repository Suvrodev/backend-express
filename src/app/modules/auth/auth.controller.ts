import { RequestHandler } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";

//Login User
const loginUser: RequestHandler = catchAsync(async (req, res, next) => {
  // console.log("Come Data to Login: ", req.body);
  const result = await AuthServices.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    statusCode: 200,
    data: {
      token: result?.accessToken,
    },
  });
});

export const AuthControllers = {
  loginUser,
};
