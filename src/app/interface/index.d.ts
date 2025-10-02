// interface CustomRequest extends Request {
//   user: JwtPayload;
// }

import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
