import { UserModel } from "../models/user.js";

// función para buscar usuario por email
export const findUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email }).lean().exec();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
