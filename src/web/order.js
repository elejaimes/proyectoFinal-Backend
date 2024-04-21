import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { orderController } from "../controllers/indexController.js";

export const orderWeb = Router();

orderWeb.get("/order", requireAuth, orderController.showUserOrder);

orderWeb.post("/order", requireAuth, orderController.createOrder);
