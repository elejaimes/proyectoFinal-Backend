import bcrypt from "bcryptjs";
import { authDAO } from "../dao/indexDAO.js";

export const findUserByEmail = async (email) => {
  try {
    const user = await authDAO.findUserByEmail(email);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// función para verificar la contraseña
export const validPass = (password, userPassword) => {
  try {
    const isValidPass = bcrypt.compareSync(password, userPassword);
    return isValidPass;
  } catch (error) {
    throw new Error(error.message);
  }
};
