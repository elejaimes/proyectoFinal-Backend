import { roleService, userService } from "../service/indexService.js";
import { logger } from "../config/winston/logger.js";

//para listar los usuarios (solo por admin)
export const getUsers = async (req, res) => {
  try {
    const { limit = 10, since = 0, filterState } = req.query;

    let message = "";
    if (filterState === "true") {
      message = "Usuarios Activos";
    } else if (filterState === "false") {
      message = "Usuarios Inactivos";
    } else {
      message = "Todos los usuarios";
    }

    const { users, totalUsers } = await userService.getUsers(
      filterState,
      limit,
      since
    );

    res.render("users", {
      title: "Listado de Usuarios",
      status: "Ok",
      message,
      method: req.method,
      totalUsers,
      users,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

//para obtener usuario a crear (solo por admin)
export const getUsers_add = async (req, res) => {
  try {
    const roles = await roleService.getRoleList();
    return res.render("userCreateForm", {
      title: "Crear usuario",
      roles,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/users");
  }
};

//crear un usuario (solo por admin)
export const postUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const newUser = {
      name,
      email,
      password,
      address,
      role,
    };

    const user = await userService.postUser(newUser);

    req.flash("successMessages", "Usuario creado exitosamente");
    res.redirect("/users");
  } catch (error) {
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/users");
  }
};

//para obtener usuario a editar (solo por admin)
export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const editUser = await userService.getUserById(id);
    const roles = await roleService.getRoleList();

    return res.render("userEditForm", {
      title: "Editar usuario",
      editUser,
      roles,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/users");
  }
};

// para editar usuario (solo por admin)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, ...rest } = req.body;

    const newState = state === "true";

    const user = await userService.updateUser(id, { ...rest, state: newState });

    req.flash("successMessages", "Usuario modificado exitosamente");
    res.redirect(`/users`);
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/users");
  }
};

//para eliminar usuario (solo por admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await userService.deleteUser(id);

    req.flash("successMessages", "Usuario eliminado exitosamente");
    res.redirect(`/users`);
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};
