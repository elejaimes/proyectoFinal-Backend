import bcrypt from "bcryptjs";
import { userDAO } from "../dao/indexDAO.js";
import { userDTO } from "../dto/userDTO.js";
import {
  singupEmailAdmin,
  singupEmailUser,
} from "../config/nodemailer/template/singupEmail.js";

export const getUsers = async (limit, since) => {
  try {
    const allUsers = await userDAO.getUsers(limit, since);
    return allUsers;
  } catch (error) {
    throw new Error(`Error in userService/getUsers: ${error}`);
  }
};

export const postUser = async (body) => {
  try {
    console.log("Entrando a userService.postUser");
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

export const upateUser = async (id, body) => {
  try {
    const { _id, password, role, ...rest } = body;

    if (password) {
      const salt = bcrypt.genSaltSync();
      rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await userDAO.upateUser(id, rest);
    return user;
  } catch (error) {
    throw new Error(`Error in userService/getUsers: ${error}`);
  }
};

export const disableUser = async (id) => {
  try {
    const user = await userDAO.disableUser(id);
    return user;
  } catch (error) {
    throw new Error(`Error in userService/getUsers: ${error}`);
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

export const putUserRoleUpdate = async (id, role) => {
  try {
    const roleUpdate = await userDAO.putUserRoleUpdate(id, role);
    return roleUpdate;
  } catch (error) {
    throw new Error(`Error in userService/getUsers: ${error}`);
  }
};
