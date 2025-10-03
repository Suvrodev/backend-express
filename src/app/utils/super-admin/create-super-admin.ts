import { UserModel } from "../../modules/user/user.model";
import { rolesGuard } from "../myAuth/authGuard";

const superAdminData = {
  name: "Super Admin",
  email: "suvrodev.cse.77@gmail.com",
  password: "YourStrongPassword123!", // must be at least 8 chars (minlength rule)
  role: rolesGuard["super-admin"],
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected , we will check is there any user who is super admin or not

  const isSuperAdminExists = await UserModel.findOne({
    role: rolesGuard["super-admin"],
  });

  console.log("is Super Admin: ", isSuperAdminExists);
  if (!isSuperAdminExists) {
    await UserModel.create(superAdminData);
  }
};

export default seedSuperAdmin;
