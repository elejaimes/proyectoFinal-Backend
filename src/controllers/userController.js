import { roleService, userService } from "../service/indexService.js";
import { logger } from "../config/winston/logger.js";

//para listar los usuarios (solo por admin)
export const getUsers = async (req, res) => {
  try {
    const { limit = 10, since = 0 } = req.query;

    const [users, totalUsers] = await userService.getUsers(limit, since);

    res.render("users", {
      title: "Listado de Usuarios",
      totalUsers,
      users,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

//para crear un usuario (solo por admin)
export const getUsers_add = async (req, res) => {
  try {
    const roles = await roleService.getRoleList();
    return res.render("createUser", {
      title: "Crear usuario",
      roles,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/users");
  }
};

export const postUser = async (req, res) => {
  try {
    console.log("Entrando a postUser");
    const body = req.body;
    const user = await userService.postUser(body);
    console.log(user);

    req.flash("successMessages", "Usuario creado exitosamente");
    res.redirect("/users/admin/add");
  } catch (error) {
    console.log("Error en postUser:", error);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/users");
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    res.json({
      message: `Usuario ID: ${id} encontrado`,
      user,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

export const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const user = await userService.putUser(id, body);

    res.status(200).json({
      message: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.deleteUser(id);

    return res.status(200).json({
      message: "Usuario desactivado de la DB",
      user,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

export const putUserRoleUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.body;

    const roleUpdate = await userService.putUserRoleUpdate(id, role);

    return res.status(200).json({
      message: `Usuario actualizado con el role ${role}`,
      roleUpdate,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};
