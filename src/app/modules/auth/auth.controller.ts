import { RequestHandler } from "express";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";

//Login User
const loginUser: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken } = result;

  res.cookie("_backEnd_refresh", refreshToken, {
    // secure: config.node_env === "production",
    secure: true,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    statusCode: 200,
    data: {
      accessToken: result?.accessToken,
      refreshToken: result?.refreshToken,
    },
  });
});

export const AuthControllers = {
  loginUser,
};
