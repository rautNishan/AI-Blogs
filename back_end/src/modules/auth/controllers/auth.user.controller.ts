import { UserLoginDto } from "../dtos/user.login.dto";
import { AuthService } from "../services/auth.service";

export class AuthUserController {
  private _authService: AuthService;
  constructor() {
    this._authService = AuthService.getInstance();
  }

  async login(data: UserLoginDto) {
    const data1 = await this._authService.login(data);
    return data1;
  }
}
