import { Router } from "express";
import { cartController } from "../controllers/indexController.js";
import { cartByIdExist } from "../helpers/dbValidator.js";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { check } from "express-validator";
import { requireAuth, requireRole } from "../middlewares/auth.js";

export const cartsWeb = Router();

cartsWeb.get("/carts", requireRole("admin"), cartController.getAllCarts);

cartsWeb.get(
  "/carts/detail/:id",
  requireRole("admin"),
  cartController.cartDetail
);

cartsWeb.get(
  "/carts/delete/:id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(cartByIdExist),
    fieldValidator,
  ],
  requireRole("admin"),
  cartController.deleteCart
);

cartsWeb.get("/cart", requireAuth, cartController.showUserCart);

cartsWeb.post(
  "/cart/add-product/:productId",
  requireAuth,
  cartController.addProductsToCart
);
