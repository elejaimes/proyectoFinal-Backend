import bcrypt from "bcryptjs";
import { userDAO } from "../dao/indexDAO.js";
import { userDTO } from "../dto/userDTO.js";
import {
  singupEmailAdmin,
  singupEmailUser,
} from "../config/nodemailer/template/singupEmail.js";

export const getUsers = async (filterState, limit, since) => {
  try {
    const { users, totalUsers } = await userDAO.getUsers(
      filterState,
      limit,
      since
    );
    return { users, totalUsers };
  } catch (error) {
    throw new Error(`Error in userService/getUsers: ${error}`);
  }
};

export const postUser = async (body) => {
  try {
    let user = userDTO(body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(body.password, salt);

    const newUser = await userDAO.postUser(user);

    console.log(newUser);

    await singupEmailAdmin(newUser);
    await singupEmailUser(newUser);
    return newUser;
  } catch (error) {
    console.log("Error en userService.postUser:", error);
    throw new Error(`Error in userService/getUsers: ${error}`);
  }
};

export const getUserById = async (id) => {
  try {
    const userById = await userDAO.getUserById(id);
    return userById;
  } catch (error) {
    throw new Error(`Error in userService/getUsers: ${error}`);
  }
};

export const updateUser = async (id, body) => {
  try {
    const { _id, password, ...rest } = body;

    if (password) {
      throw new Error("Password cannot be updated through this endpoint");
    }

    const user = await userDAO.updateUser(id, rest);
    return user;
  } catch (error) {
    throw new Error(`Error in userService/getUsers: ${error}`);
  }
};

export const updateUserAndPassword = async (id, body) => {
  try {
    let user = userDTO(body);

    if (body.password) {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(body.password, salt);
    }

    const editUser = await userDAO.updateUser(id, user);
    return editUser;
  } catch (error) {
    throw new Error(`Error in userService/updateUserAndPassword: ${error}`);
  }
};

export const deleteUser = async (id) => {
  try {
    const deleteUser = await userDAO.deleteUser(id);
    return deleteUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
