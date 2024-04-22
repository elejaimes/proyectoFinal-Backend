import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { apiOrderController } from "../apiControllers/apiIndexController.js";

export const apiOrders = Router();

apiOrders.get("/", requireAuth, apiOrderController.showUserOrder);

apiOrders.post("/", requireAuth, apiOrderController.createOrder);
