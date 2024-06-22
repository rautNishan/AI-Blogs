import { USER_ROLE } from "../../common/constants/roles.constant";
import { UserService } from "../../modules/users/services/user.service";
import { DBConnection } from "../connection/connection";

export async function seedAdmin() {
  await DBConnection.connection();
  const userService = UserService.getInstance();
  const existingAdmin = await userService.getAll({
    options: { where: { userName: "admin" } },
  });
  if (existingAdmin.length > 0) {
    for (let data of existingAdmin) {
      await userService.hardDelete(data);
    }
  }
  await userService.create({
    userName: "admin",
    email: "admin@gmail.com",
    role: USER_ROLE.ADMIN,
    password: "admin",
  });
  await DBConnection.closeConnection();
}

seedAdmin()
  .then(() => console.log("AdminSeed Success"))
  .catch((error) => console.log("Something went wrong: ", error));
