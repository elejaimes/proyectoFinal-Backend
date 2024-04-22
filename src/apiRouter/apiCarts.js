import { Router } from "express";
import { requireAuth, requireRole } from "../middlewares/auth.js";
import { apiCartController } from "../apiControllers/apiIndexController.js";
import { cartByIdExist } from "../helpers/dbValidator.js";
import { fieldValidator } from "../middlewares/fieldValidator.js";
import { check } from "express-validator";

export const apiCarts = Router();

apiCarts.get("/", requireRole("admin"), apiCartController.getAllCarts);

apiCarts.get("/:id", requireRole("admin"), apiCartController.cartDetail);

apiCarts.delete(
  ":id",
  [
    check("id", "El ID no es valido").isMongoId(),
    check("id").custom(cartByIdExist),
    fieldValidator,
  ],
  requireRole("admin"),
  apiCartController.deleteCart
);

apiCarts.get("/user-cart", requireAuth, apiCartController.showUserCart);

apiCarts.post("/:productId", requireAuth, apiCartController.addProductsToCart);

apiCarts.put("/:productId", requireAuth, apiCartController.updateQuantity);

apiCarts.delete(
  "/:productId",
  requireAuth,
  apiCartController.removeProductFromCart
);
