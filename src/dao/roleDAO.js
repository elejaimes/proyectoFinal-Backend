import { RoleModel } from "../models/role.js";

export const getRoleList = async () => {
  try {
    const roleList = await RoleModel.find().lean();
    return roleList;
  } catch (error) {
    throw new Error(error.message);
  }
};

//para el register
export const findDefaultRole = async () => {
  try {
    const defaultRole = await RoleModel.findOne({ role: "user" });
    if (defaultRole) {
      return defaultRole;
    } else {
      throw new Error("No se encontró el rol predeterminado.");
    }
  } catch (error) {
    throw new Error(`Error al buscar el rol predeterminado: ${error.message}`);
  }
};
