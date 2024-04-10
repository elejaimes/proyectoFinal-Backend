import { Router } from "express";
import { body } from "express-validator";
import { extractFile } from "../middlewares/multer.js";
import {
  formNormal,
  formNormal_post,
  formUpload,
  formUpload_post,
} from "../controllers/formController.js";

export const formWeb = Router();

formWeb.get("/formulario/normal", formNormal);
formWeb.post(
  "/formulario/normal",
  [
    body("name")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("El nombre no puede contener caracteres especiales"),
    body("email")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("Por favor, ingrese una dirección de email válida."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Por favor, cree una contraseña."),
  ],
  formNormal_post
);

formWeb.get("/formulario/upload", formUpload);
formWeb.post("/formulario/upload", extractFile("image"), formUpload_post);
