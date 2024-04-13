import { UserModel } from "../models/user.js";

export const getUsers = async (filterState, limit, since) => {
  try {
    let filter = {}; // Filtro vacío por defecto para obtener todos los usuarios
    if (filterState !== undefined && filterState !== "") {
      filter = { state: filterState }; // Aplicar filtro por estado si se proporciona y no está vacío
    }

    const users = await UserModel.find(filter)
      .populate("role", "role")
      .limit(Number(limit))
      .skip(Number(since))
      .lean();

    const totalUsers = await UserModel.countDocuments(filter).exec();

    return { users, totalUsers };
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
    throw new Error(`Error in userDAO/postUser: ${error}`);
  }
};

export const getUserById = async (id) => {
  try {
    const userById = await UserModel.findById(id).lean();
    return userById;
  } catch (error) {
    throw new Error(`Error in userDAO/getUsers: ${error}`);
  }
};

export const updateUser = async (id, rest) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: rest },
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
