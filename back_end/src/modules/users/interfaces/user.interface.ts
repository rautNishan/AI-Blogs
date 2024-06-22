import { USER_ROLE } from "../../../common/constants/roles.constant";
import {
  IBaseRepository,
  IFindOneOption,
} from "../../../database/interfaces/database.interfaces";

export interface IUser {
  password: string;
  role?: USER_ROLE;
  email?: string;
  userName: string;
}

export interface IUserService<T> extends IBaseRepository<T> {
  getByEmail(email: string, options: IFindOneOption<T>): Promise<T | null>;
  getByUserName(
    userName: string,
    options: IFindOneOption<T>
  ): Promise<T | null>;
}
