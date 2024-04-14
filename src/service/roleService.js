import { roleDAO } from "../dao/indexDAO.js";

export const getRoleList = async () => {
  try {
    const roleList = await roleDAO.getRoleList();
    return roleList;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const findDefaultUserRole = async () => {
  try {
    const defaultRole = await roleDAO.findDefaultRole();
    return defaultRole;
  } catch (error) {
    throw new Error(error.message);
  }
};

//para consultar el rol

export const checkRole = async (roleName) => {
  try {
    const role = await roleDAO.checkRole(roleName);
    return role;
  } catch (error) {
    throw new Error(error.message);
  }
};
