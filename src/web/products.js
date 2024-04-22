import { Router } from "express";
import { body, check } from "express-validator";
import { productController } from "../controllers/indexController.js";
import { productByIdExist } from "../helpers/dbValidator.js";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { requireRole } from "../middlewares/auth.js";

export const productsWeb = Router();

productsWeb.get(
  "/productos/admin/todos-los-productos",
  requireRole("admin"),
  productController.getAdminPanelProducts
);

//Cualquiera puede acceder a ver todos los productos
productsWeb.get(
  "/productos/todos-los-productos",
  productController.getProducts
);

productsWeb.get(
  "/productos/todos-los-productos/add",
  requireRole("admin"),
  productController.getProducts_add
);

//Cualquiera puede acceder a ver todos los productos
productsWeb.get("/productos/detalles/:id", productController.getProductById);

productsWeb.post(
  "/productos/todos-los-productos/add",
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
  productController.postProducts
);

productsWeb.get(
  "/productos/todos-los-productos/edit/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(productByIdExist),
    fieldValidator,
  ],
  requireRole("admin"),
  productController.editProduct
);

productsWeb.post(
  "/productos/todos-los-productos/edit/:id",
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
  productController.updateProduct_post
);

productsWeb.get(
  "/productos/todos-los-productos/delete/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(productByIdExist),
    fieldValidator,
  ],
  requireRole("admin"),
  productController.deleteProduct
);

//Cualquiera puede acceder a ver todos los productos
productsWeb.get(
  "/productos/productos-por-categorias/:id",
  fieldValidator,
  productController.getProductByCategory
);
