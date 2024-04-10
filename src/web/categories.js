import { Router } from "express";
import { check } from "express-validator";
import { categoryController } from "../controllers/indexController.js";
import { categoryByIdExist } from "../helpers/dbValidator.js";
import { fieldValidator } from "../middlewares/fieldValidator.js";

export const categoriesWeb = Router();

categoriesWeb.get("/productos/categorias", categoryController.getCategories);

categoriesWeb.get(
  "/productos/categorias/add",
  categoryController.getCategories_add
);

categoriesWeb.post(
  "/productos/categorias/add",
  [check("name", "El nombre es obligatorio").not().isEmpty()],
  categoryController.postCategory
);

categoriesWeb.get(
  "/productos/categorias/edit/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(categoryByIdExist),
    fieldValidator,
  ],
  categoryController.editCategory
);

categoriesWeb.post(
  "/productos/categorias/edit/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(categoryByIdExist),
    check("name", "El nombre no es válido").not().isEmpty(),
    fieldValidator,
  ],
  categoryController.updateCategory_post
);

categoriesWeb.get(
  "/productos/categorias/delete/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(categoryByIdExist),
    fieldValidator,
  ],
  categoryController.deleteCategory
);
