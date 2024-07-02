import jwt, {
  Jwt,
  JwtPayload,
  Secret,
  SignOptions,
  VerifyOptions,
} from "jsonwebtoken";

import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { HttpStatusCode } from "../../../common/constants/http.status.code";
import { HttpException } from "../../../common/exceptions/http-exceptions";
import { DBConnection } from "../../../database/connection/connection";
import { UserEntity } from "../../users/entities/user.entity";
import { UserRepository } from "../../users/repository/user.repository";
import {
  IAuth,
  ICreateTokenData,
  ILoginIncomingData,
} from "../interfaces/auth.interfaces";
import requestConfig from "../../../common/request/config/request.config";
import { IAuthenticatedUser } from "../../../common/request/interfaces/request.paginated.interface";

export class AuthService implements IAuth {
  private static _instance: AuthService;

  private _repo: Repository<UserEntity>;

  private _userRepository: UserRepository;

  private constructor() {
    this._repo = DBConnection.getConnection().getRepository(UserEntity);
    this._userRepository = new UserRepository(this._repo);
  }

  public static getInstance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService();
    }
    return AuthService._instance;
  }

  async login(incomingData: ILoginIncomingData): Promise<string> {
    try {
      let existingUser: UserEntity | null = null;

      if (incomingData.email) {
        existingUser = await this._userRepository.getOne({
          options: { where: { email: incomingData.email } },
        });
      }

      if (incomingData.userName) {
        existingUser = await this._userRepository.getOne({
          options: { where: { userName: incomingData.userName } },
        });
      }

      if (!existingUser) {
        throw new HttpException(
          HttpStatusCode.NOT_FOUND,
          "User does not exists"
        );
      }

      //If there is user then check the incoming password

      const isPasswordCorrect: boolean = await this.verifyPassword(
        incomingData.password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        throw new HttpException(
          HttpStatusCode.UNAUTHORIZED,
          "Invalid Credential"
        );
      }

      //If password is correct return token

      const payLoad: ICreateTokenData = {
        id: existingUser.id,
        userName: existingUser.userName,
        userRole: existingUser.role,
      };

      return await this.createToken(payLoad, requestConfig.secretKey!, {
        expiresIn: "1d",
      });
    } catch (error) {
      console.log("This is Error: ", error);

      throw error;
    }
  }

  async createToken(
    payload: ICreateTokenData,
    secretKey: Secret,
    options?: SignOptions
  ): Promise<string> {
    return jwt.sign(payload, secretKey, options);
  }

  async decodeToken(
    token: string,
    secretKey: Secret,
    options?: VerifyOptions
  ): Promise<Jwt | JwtPayload | string> {
    const type = jwt.verify(token, secretKey, options);
    return type;
  }

  async verifyPassword(
    incomingPassword: string,
    dbPassword: string
  ): Promise<boolean> {
    const isPasswordCorrect: boolean = await bcrypt.compare(
      incomingPassword,
      dbPassword
    );
    return isPasswordCorrect;
  }
}
