import { UserCreateDto } from "../dtos/user.create.dto";
import { UserService } from "../services/user.service";

export class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  async create(data: UserCreateDto) {
    console.log("This is Incoming Data: ", data);
    return await this._userService.create(data);
  }
}
