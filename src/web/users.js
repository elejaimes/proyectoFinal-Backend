import { Router } from "express";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { userController } from "../controllers/indexController.js";
import { emailExist, userByIdExist } from "../helpers/dbValidator.js";
import { requireRole } from "../middlewares/auth.js";

export const usersWeb = Router();

usersWeb.get("/users", requireRole("admin"), userController.getUsers);

usersWeb.get("/users/admin/add", userController.getUsers_add);

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
  userController.postUser
);

usersWeb.get(
  "/users/admin/edit/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(userByIdExist),
    fieldValidator,
  ],
  userController.editUser
);

usersWeb.post(
  "/users/admin/edit/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email no es valido").isEmail(),
    fieldValidator,
  ],
  userController.updateUser
);

usersWeb.get(
  "/users/admin/delete/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(userByIdExist),
    fieldValidator,
  ],
  userController.deleteUser
);

//Registro de usuarios

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

//Login de usuarios registrados

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
