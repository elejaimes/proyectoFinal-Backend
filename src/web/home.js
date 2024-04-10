import { Router } from "express";
import { homeController } from "../controllers/homeController.js";

export const homeWeb = Router();

homeWeb.get("/", homeController);
