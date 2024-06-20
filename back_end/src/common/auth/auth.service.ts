import jwt, { Jwt, JwtPayload, Secret, SignOptions, VerifyOptions } from "jsonwebtoken";
import {
  IAuth,
  ICreateTokenData,
  ILoginIncomingData,
} from "./interfaces/auth.interfaces";

export class AuthService implements IAuth {
  constructor() {}

  async login(incomingData: ILoginIncomingData): Promise<string> {
    return "heeh";
  }

  async createToken(
    payload: ICreateTokenData,
    secretKey: Secret,
    options?: SignOptions
  ): Promise<string> {
    return "hehe";
  }

  async verifyToken(
    token: string,
    secretKey: Secret,
    options?: VerifyOptions
  ): Promise<Jwt | JwtPayload | string> {
    const type = jwt.verify(token, secretKey, options);
    return type;
  }
}
