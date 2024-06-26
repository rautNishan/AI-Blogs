import { Request, Response, NextFunction } from "express";
import { HttpException } from "../../exceptions/http-exceptions";
import { HttpStatusCode } from "../../constants/http.status.code";
import { USER_ROLE } from "../../constants/roles.constant";
import { AuthService } from "../../../modules/auth/services/auth.service";
import requestConfig from "../config/request.config";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { REQUEST_META } from "../constant/request.constant";

export async function UserProtectedGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const _authService = AuthService.getInstance();
  try {
    //Extract token
    const incomingToken: string | undefined | string[] =
      req.headers.authorization?.split(" ");

    //If token is not found don't let user to get into the server
    if (!incomingToken) {
      throw new HttpException(HttpStatusCode.UNAUTHORIZED, "Not Authenticated");
    }

    const decodedToken: Jwt | JwtPayload | string =
      await _authService.decodeToken(
        incomingToken[1],
        requestConfig.secretKey!
      );

    const incomingUrlRequest = req.baseUrl.split("/")[1].toUpperCase();

    if (
      incomingUrlRequest === USER_ROLE.ADMIN &&
      decodedToken["userRole"] !== USER_ROLE.ADMIN
    ) {
      throw new HttpException(
        HttpStatusCode.UNAUTHORIZED,
        "User not permitted"
      );
    }
    if (
      incomingUrlRequest === USER_ROLE.USER &&
      decodedToken["userRole"] !== USER_ROLE.USER
    ) {
      throw new HttpException(
        HttpStatusCode.UNAUTHORIZED,
        "User not permitted"
      );
    }
    req[REQUEST_META.PROTECTED_USER] = decodedToken["id"];
    next();
  } catch (error) {
    next(error);
  }
}
