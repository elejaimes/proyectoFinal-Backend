import { Router, json, urlencoded } from "express";
import { apiCarts } from "./apiCarts.js";
import { apiProducts } from "./apiProducts.js";
import { apiCategories } from "./apiCategories.js";
import { apiUsers } from "./apiUsers.js";
import { apiOrders } from "./apiOrder.js";

export const apiRouter = Router();

apiRouter.use(json());
apiRouter.use(urlencoded({ extended: true }));

apiRouter.use("/users", apiUsers);
apiRouter.use("/carts", apiCarts);
apiRouter.use("/products", apiProducts);
apiRouter.use("/categories", apiCategories);
apiRouter.use("/order", apiOrders);
