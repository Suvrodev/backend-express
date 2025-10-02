import { UserModel } from "../user.model";

export const checkUserDeleteOrNot = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    if (user && user.isDeleted) {
      return true; // user আছে কিন্তু delete করা হয়েছে
    }
    return false; // user নাই বা আছে কিন্তু active
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw error;
  }
};
