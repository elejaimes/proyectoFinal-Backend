import { roleDAO } from "../dao/indexDAO.js";

export const getRoleList = async () => {
  try {
    const roleList = await roleDAO.getRoleList();
    return roleList;
  } catch (error) {
    throw new Error(error.message);
  }
};
