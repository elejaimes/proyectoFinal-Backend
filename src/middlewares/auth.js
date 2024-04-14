import { roleService } from "../service/indexService.js";

//solo roles determinados (autorización)
export const requireRole = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user) {
        const userRole = await roleService.checkRole(role);
        if (req.user.role && req.user.role._id.equals(userRole._id)) {
          return next();
        } else {
          req.flash("errorMessages", [
            { msg: "No tienes permisos para acceder a esta página." },
          ]);
          return res.redirect("/"); // O la página a la que quieras redirigir
        }
      } else {
        req.flash("errorMessages", [
          { msg: "Debes iniciar sesión para acceder a esta página." },
        ]);
        return res.redirect("/users/login"); // O la página de inicio de sesión
      }
    } catch (error) {
      console.error("Error en middleware de autorización:", error);
      req.flash("errorMessages", [{ msg: "Error interno del servidor." }]);
      return res.redirect("/"); // O la página a la que quieras redirigir
    }
  };
};

//Usuarios que han iniciado sesión (autenticación)
export const requireAuth = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("errorMessages", [
        { msg: "Debes iniciar sesión para acceder a esta página." },
      ]);
      return res.redirect("/users/login");
    }
  } catch (error) {
    console.error("Error en middleware de autenticación:", error);
    req.flash("errorMessages", [{ msg: "Error interno del servidor." }]);
    return res.redirect("/users/login");
  }
};
