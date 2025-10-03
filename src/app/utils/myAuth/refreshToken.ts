import jwt from "jsonwebtoken";
import config from "../../config";

export const getRefreshToken = (user: any) => {
  //Create Token and send to the client
  const jwtPayload = {
    _id: user._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secreet as string,
    {
      expiresIn: "30d",
      //  expiresIn: "1m",
      // expiresIn: "20s",
    }
  );
  console.log("JwtPayload: ", jwtPayload);
  return accessToken;
};

// require("crypto").randomBytes(64).toString("hex");
