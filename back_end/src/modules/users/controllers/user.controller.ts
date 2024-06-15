import { UserService } from "../services/user.service";

export class UserController {
  private _userService: UserService;
  constructor() {
    this._userService = new UserService();
  }

  async create() {
    return await this._userService.create({ data: "any" });
  }
}
