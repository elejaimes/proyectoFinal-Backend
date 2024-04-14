import passport from "passport";
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

// Registro de usuarios

export const getUsers_register = async (req, res) => {
  try {
    return res.render("register", {
      title: "Registro",
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

export const postUser_register = async (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    try {
      if (err) {
        throw new Error(err);
      }
      if (!user) {
        throw new Error(info.message);
      }
      req.logIn(user, async (err) => {
        if (err) {
          throw new Error(err);
        }
        req.flash(
          "successMessages",
          "Su registro se ha completado de forma éxitosa"
        );
        res.redirect("/users/login");
      });
    } catch (error) {
      req.flash("errorMessages", [{ msg: error.message }]);
      return res.redirect("/users/register");
    }
  })(req, res, next);
};

// login de usuarios

export const getUsers_login = async (req, res) => {
  try {
    return res.render("login", {
      title: "Iniciar Sesión",
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

export const postUsers_login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        throw new Error(
          "Hubo un problema durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde."
        );
      }
      if (!user) {
        throw new Error(info.message);
      }
      req.logIn(user, async (err) => {
        if (err) {
          throw new Error(
            "Hubo un problema durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde."
          );
        }
        //Guardar usuario en la sesión
        req.session.user = user;
        console.log(req.session);
        req.flash("successMessages", "¡Inicio de sesión exitoso!");
        res.redirect("/");
      });
    } catch (error) {
      req.flash("errorMessages", [{ msg: error.message }]);
      return res.redirect("/users/login");
    }
  })(req, res, next);
};

// logout de usuarios

export const logoutUser = (req, res) => {
  req.logout((error) => {
    if (error) {
      console.error("Error al cerrar sesión: ", error);
    }
    req.flash("successMessages", "Logout OK");
    res.redirect("/");
  });
};

//login sin passport
// export const postUsers_login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userService.findUserByEmail(email);
//     if (!user) {
//       throw new Error("Los datos del usuario o contraseña son incorrectos");
//     }
//     if (!user.state) {
//       throw new Error("Los datos del usuario o contraseña son incorrectos");
//     }

//     const isValidPass = authService.validPass(password, user.password);
//     if (!isValidPass) {
//       throw new Error("Los datos del usuario o contraseña son incorrectos");
//     }
//     req.flash("successMessages", "Ha iniciado sesión de manera exitosa");
//     res.redirect("/");
//   } catch (error) {
//     req.flash("errorMessages", [{ msg: error.message }]);
//     return res.redirect("/users/register");
//   }
// };

// registro de usuarios rol user predeterminado sin passport

// export const postUser_register = async (req, res) => {
//   try {
//     const { name, email, password, address } = req.body;

//     const defaultRole = await roleService.findDefaultUserRole();

//     const newUser = {
//       name,
//       email,
//       password,
//       address,
//       role: defaultRole._id,
//     };

//     const user = await userService.postUser(newUser);

//     req.flash(
//       "successMessages",
//       "Su registro se ha completado de forma éxitosa"
//     );
//     res.redirect("/users/login");
//   } catch (error) {
//     req.flash("errorMessages", [{ msg: error.message }]);
//     return res.redirect("/users/register");
//   }
// };
