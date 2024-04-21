import { Router } from "express";
import { homeWeb } from "./home.js";
import { formWeb } from "./form.js";
import { productsWeb } from "./products.js";
import { categoriesWeb } from "./categories.js";
import { usersWeb } from "./users.js";
import { cartsWeb } from "./carts.js";
import { orderWeb } from "./order.js";

export const indexWeb = Router();

indexWeb.use(homeWeb);
indexWeb.use(formWeb);
indexWeb.use(categoriesWeb);
indexWeb.use(productsWeb);
indexWeb.use(usersWeb);
indexWeb.use(cartsWeb);
indexWeb.use(orderWeb);
