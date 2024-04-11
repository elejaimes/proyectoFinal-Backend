import { Router } from "express";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { userController } from "../controllers/indexController.js";
import { emailExist, userByIdExist } from "../helpers/dbValidator.js";

export const usersWeb = Router();

usersWeb.get("/users", userController.getUsers);

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
