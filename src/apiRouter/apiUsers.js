import { Router } from "express";
import { apiUserController } from "../apiControllers/apiIndexController.js";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { emailExist, userByIdExist } from "../helpers/dbValidator.js";
import { requireAuth, requireRole } from "../middlewares/auth.js";

export const apiUsers = Router();

apiUsers.get("/", requireRole("admin"), apiUserController.getUsers);

apiUsers.post(
  "/adminPanel",
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
  apiUserController.postUser
);

apiUsers.get(
  "/adminPanel/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(userByIdExist),
    fieldValidator,
  ],
  requireRole("admin"),
  apiUserController.getUserById
);

apiUsers.put(
  "/adminPanel/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email no es valido").isEmail(),
    fieldValidator,
  ],
  requireRole("admin"),
  apiUserController.updateUser
);

apiUsers.get(
  "/adminPanel/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(userByIdExist),
    fieldValidator,
  ],
  requireRole("admin"),
  apiUserController.deleteUser
);

//Registro de usuarios (cualquiera)

apiUsers.post(
  "/register",
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
  apiUserController.postUser_register
);

//Login de usuarios registrados (cualquiera)

apiUsers.post(
  "/login",
  [
    check("email", "Error en el email o contraseña").isEmail(),
    check("password", "El password debe contener 8 o mas caracteres ").isLength(
      {
        min: 8,
      }
    ),
    fieldValidator,
  ],
  apiUserController.postUsers_login
);

apiUsers.get("/logout", apiUserController.logoutUser);

// Modificar datos del usuario logeado

apiUsers.put(
  "/editData/:id",
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
  apiUserController.updateData
);
