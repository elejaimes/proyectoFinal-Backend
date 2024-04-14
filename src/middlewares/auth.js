import { roleService } from "../service/indexService.js";

export const requireRole = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user) {
        const userRole = await roleService.checkRole(role);
        if (req.user.role && req.user.role._id.equals(userRole._id)) {
          return next();
        }
      }
      res.status(403).json({ message: "Acceso denegado" });
    } catch (error) {
      console.error("Error en middleware de autorización:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
};

// Middleware para verificar si el usuario está autenticado
// export const isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next(); // Si está autenticado, pasa al siguiente middleware
//   } else {
//     // Si no está autenticado, redirige al usuario al formulario de inicio de sesión
//     req.flash(
//       "errorMessages",
//       "Debes iniciar sesión para acceder a esta página"
//     );
//     res.redirect("/users/login");
//   }
// };

// // Middleware para verificar roles
// export const checkRole = (role) => {
//   return (req, res, next) => {
//     if (req.user && req.user.role === role) {
//       console.log(req.user.role);
//       return next(); // Si el usuario tiene el rol requerido, pasa al siguiente middleware
//     } else {
//       // Si el usuario no tiene el rol requerido, muestra un mensaje de error
//       req.flash(
//         "errorMessages",
//         "No tienes permiso para acceder a esta página"
//       );
//       res.redirect("/");
//     }
//   };
// };

// export function loggedUserWeb(req, res, next) {
//   if (!req.isAuthenticated()) {
//     req.session.redirectTo = req.originalUrl;
//     return res.redirect("/login");
//   }
//   next();
// }

// export function loggedAdmin(req, res, next) {
//   if (req.user.role.role !== "admin") {
//     return res.status(403).json({
//       status: "error",
//       message: `El usuario: ${req.user.name} no es administrador`,
//     });
//   }
//   next();
// }

// export function isAdmin(username, password) {
//   return (
//     username === process.env.ADMIN_USERNAME &&
//     password === process.env.ADMIN_PASSWORD
//   );
// }

// export function attachUser(req, res, next) {
//   res.locals.registeredUser = req.user || null;
//   console.log(req.user);
//   next();
// }
