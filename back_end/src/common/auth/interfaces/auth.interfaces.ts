import { Jwt, JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { USER_ROLE } from "../../constants/roles.constant";

export interface IAuth {
  login: (incomingData: ILoginIncomingData) => Promise<string>;
  createToken: (
    payload: ICreateTokenData,
    secretKey: Secret,
    options?: SignOptions
  ) => Promise<string>;
  verifyToken: (
    token: string,
    secretKey: Secret,
    options?: SignOptions
  ) => Promise<Jwt | JwtPayload | string>;
}

export interface ILoginIncomingData {
  userName?: string;
  email?: string;
  password: string;
}

export interface ICreateTokenData {
  id: number;
  userName?: string;
  email?: string;
  userRole: USER_ROLE;
}
