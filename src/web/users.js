import { Router } from "express";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { userController } from "../controllers/indexController.js";
import { emailExist, userByIdExist } from "../helpers/dbValidator.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

export const usersWeb = Router();

usersWeb.get("/users", requireRole("admin"), userController.getUsers);

usersWeb.get(
  "/users/admin/add",
  requireRole("admin"),
  userController.getUsers_add
);

usersWeb.post(
  "/users/admin/add",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email no es valido").isEmail(),
    check("email").custom(emailExist),
    check("password", "El password debe contener 8 o mas caracteres ").isLength(
      {
        min: 8,
      }
    ),
    fieldValidator,
  ],
  requireRole("admin"),
  userController.postUser
);

usersWeb.get(
  "/users/admin/edit/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(userByIdExist),
    fieldValidator,
  ],
  requireRole("admin"),
  userController.editUser
);

usersWeb.post(
  "/users/admin/edit/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email no es valido").isEmail(),
    fieldValidator,
  ],
  requireRole("admin"),
  userController.updateUser
);

usersWeb.get(
  "/users/admin/delete/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(userByIdExist),
    fieldValidator,
  ],
  requireRole("admin"),
  userController.deleteUser
);

//Registro de usuarios (cualquiera)

usersWeb.get("/users/register", userController.getUsers_register);

usersWeb.post(
  "/users/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email no es valido").isEmail(),
    check("email").custom(emailExist),
    check("password", "El password debe contener 8 o mas caracteres ").isLength(
      {
        min: 8,
      }
    ),
    fieldValidator,
  ],
  userController.postUser_register
);

//Login de usuarios registrados (cualquiera)

usersWeb.get("/users/login", userController.getUsers_login);
usersWeb.post(
  "/users/login",
  [
    check("email", "Error en el email o contraseña").isEmail(),
    check("password", "El password debe contener 8 o mas caracteres ").isLength(
      {
        min: 8,
      }
    ),
    fieldValidator,
  ],
  userController.postUsers_login
);

usersWeb.get("/users/logout", userController.logoutUser);

//Modificar datos y contraseña de ususario registrado /users/editData/{{_id}}

usersWeb.get(
  "/users/editData/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(userByIdExist),
    fieldValidator,
  ],
  requireAuth,
  userController.editData
);

usersWeb.post(
  "/users/editData/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email no es valido").isEmail(),
    check("password", "El password debe contener 8 o mas caracteres ").isLength(
      {
        min: 8,
      }
    ),
    fieldValidator,
  ],
  requireAuth,
  userController.updateData
);
