import { Router } from "express";
import { check } from "express-validator";
import { categoryByIdExist } from "../helpers/dbValidator.js";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { apiCategoryController } from "../apiControllers/apiIndexController.js";

export const apiCategories = Router();

apiCategories.get("/", apiCategoryController.getCategories);

apiCategories.post(
  "/",
  [check("name", "El nombre es obligatorio").not().isEmpty()],
  apiCategoryController.createCategory
);

apiCategories.put(
  "/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(categoryByIdExist),
    check("name", "El nombre no es válido").not().isEmpty(),
    fieldValidator,
  ],
  apiCategoryController.updateCategory
);

apiCategories.delete(
  "/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(categoryByIdExist),
    fieldValidator,
  ],
  apiCategoryController.deleteCategory
);
