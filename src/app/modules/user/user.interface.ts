export type TUser = {
  name: string;
  email: string;
  role: "user" | "admin";
  isDeleted: boolean;
};
