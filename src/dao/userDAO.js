import { UserModel } from "../models/user.js";

export const getUsers = async (limit, since) => {
  try {
    const activUser = { state: true };
    const allUsers = await Promise.all([
      UserModel.find(activUser).limit(Number(limit)).skip(Number(since)),
      UserModel.countDocuments(activUser).exec(),
    ]);
    return allUsers;
  } catch (error) {
    throw new Error(`Error in userDAO/getUsers: ${error}`);
  }
};

export const postUser = async (user) => {
  try {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(`Error in userDAO/getUsers: ${error}`);
  }
};

export const getUserById = async (id) => {
  try {
    const userById = await UserModel.findById(id).lean().exec();
    return userById;
  } catch (error) {
    throw new Error(`Error in userDAO/getUsers: ${error}`);
  }
};

export const upateUser = async (id, rest) => {
  try {
    const user = await UserModel.findByIdAndUpdate(id, rest, { new: true });
    return user;
  } catch (error) {
    throw new Error(`Error in userDAO/getUsers: ${error}`);
  }
};

export const disableUser = async (id) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );
    return user;
  } catch (error) {
    throw new Error(`Error in userDAO/getUsers: ${error}`);
  }
};

export const deleteUser = async (id) => {
  try {
    const deleteUser = await UserModel.findOneAndDelete({ _id: id });
    return deleteUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const putUserRoleUpdate = async (id, role) => {
  try {
    const roleUpdate = await UserModel.findByIdAndUpdate(id, role, {
      new: true,
    });
    return roleUpdate;
  } catch (error) {
    throw new Error(`Error in userDAO/getUsers: ${error}`);
  }
};
