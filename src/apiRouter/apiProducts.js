import { Router } from "express";
import { apiProductController } from "../apiControllers/apiIndexController.js";
import { body, check } from "express-validator";
import { productByIdExist } from "../helpers/dbValidator.js";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { requireRole } from "../middlewares/auth.js";

export const apiProducts = Router();

apiProducts.get("/", apiProductController.getAllProducts);

apiProducts.post(
  "/",
  [
    body("name", "El nombre es obligatorio").trim().notEmpty().escape(),
    body("price", "El precio es obligatorio").isNumeric().notEmpty(),
    body("description", "La descripcción es obligatoria")
      .trim()
      .notEmpty()
      .escape(),
    fieldValidator,
  ],
  requireRole("admin"),
  apiProductController.createProduct
);

apiProducts.get(
  "/:id",
  requireRole("admin"),
  apiProductController.getProductById
);

apiProducts.put(
  "/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(productByIdExist),
    body("name", "El nombre es obligatorio").trim().notEmpty().escape(),
    body("price", "El precio es obligatorio").isNumeric().notEmpty(),
    body("description", "La descripcción es obligatoria")
      .trim()
      .notEmpty()
      .escape(),
    fieldValidator,
  ],
  requireRole("admin"),
  apiProductController.updateProduct
);

apiProducts.delete(
  "/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(productByIdExist),
    fieldValidator,
  ],
  requireRole("admin"),
  apiProductController.deleteProduct
);

apiProducts.get(
  "/category/:id",
  fieldValidator,
  apiProductController.getProductByCategory
);
