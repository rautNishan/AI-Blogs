import { Request, Response, NextFunction } from "express";
import { HttpException } from "../../exceptions/http-exceptions";
import { HttpStatusCode } from "../../constants/http.status.code";
import { USER_ROLE } from "../../constants/roles.constant";

export async function UserProtectedGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Extract token
    const incomingToken: string | undefined = req.headers.authorization;
    console.log("This is Incoming Token: ", incomingToken);

    const decodedToken: string = "USER";

    //If token is not found don't let user to get into the server
    if (!incomingToken) {
      throw new HttpException(HttpStatusCode.UNAUTHORIZED, "Not Authenticated");
    }

    const incomingUrlRequest = req.baseUrl.split("/")[1].toUpperCase();
    console.log("This is Incoming URL Path: ", incomingUrlRequest);
    console.log("Decoded Token: ", decodedToken);

    if (
      incomingUrlRequest === USER_ROLE.ADMIN &&
      decodedToken !== USER_ROLE.ADMIN
    ) {
      throw new HttpException(
        HttpStatusCode.UNAUTHORIZED,
        "User not permitted"
      );
    }
    if (
      incomingUrlRequest === USER_ROLE.USER &&
      decodedToken !== USER_ROLE.USER
    ) {
      throw new HttpException(
        HttpStatusCode.UNAUTHORIZED,
        "User not permitted"
      );
    }
    next();
  } catch (error) {
    console.log("This is Error: ", error);
    next(error);
  }
  //Check url
  //Check if user if permitted or not
}
