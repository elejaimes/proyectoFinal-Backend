import { Router } from "express";
// import { body, check } from "express-validator";
// import { fieldValidator } from "../middlewares/fieldValidator.js";
import { cartController } from "../controllers/indexController.js";

export const cartsWeb = Router();

cartsWeb.get("/carts", cartController.getAllCarts);

// cartsWeb.get(
//   "/productos/todos-los-productos/add",
//   productController.getProducts_add
// );

// cartsWeb.get("/productos/detalles/:id", productController.getProductById);

// cartsWeb.post(
//   "/productos/todos-los-productos/add",
//   [
//     body("name", "El nombre es obligatorio").trim().notEmpty().escape(),
//     body("price", "El precio es obligatorio").isNumeric().notEmpty(),
//     body("description", "La descripcción es obligatoria")
//       .trim()
//       .notEmpty()
//       .escape(),
//     fieldValidator,
//   ],
//   productController.postProducts
// );

// cartsWeb.get(
//   "/productos/todos-los-productos/edit/:id",
//   [
//     check("id", "El ID no es valido").isMongoId(),
//     check("id").custom(productByIdExist),
//     fieldValidator,
//   ],
//   productController.editProduct
// );

// cartsWeb.post(
//   "/productos/todos-los-productos/edit/:id",
//   [
//     check("id", "El ID no es valido").isMongoId(),
//     check("id").custom(productByIdExist),
//     body("name", "El nombre es obligatorio").trim().notEmpty().escape(),
//     body("price", "El precio es obligatorio").isNumeric().notEmpty(),
//     body("description", "La descripcción es obligatoria")
//       .trim()
//       .notEmpty()
//       .escape(),
//     fieldValidator,
//   ],
//   productController.updateProduct_post
// );

// cartsWeb.get(
//   "/productos/todos-los-productos/delete/:id",
//   [
//     check("id", "El ID no es valido").isMongoId(),
//     check("id").custom(productByIdExist),
//     fieldValidator,
//   ],
//   productController.deleteProduct
// );

// cartsWeb.get(
//   "/productos/productos-por-categorias/:id",
//   fieldValidator,
//   productController.getProductByCategory
// );
