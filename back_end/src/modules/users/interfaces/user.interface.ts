import { USER_ROLE } from "../../../common/constants/roles.constant";

export interface IFullName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface IUser {
  fullName: IFullName;
  password: string;
  role: USER_ROLE;
  email?: string;
  userName: string;
}
