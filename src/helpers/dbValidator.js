import mongoose from "mongoose";
import { CartModel } from "../models/cart.js";
import { CategoryModel } from "../models/category.js";
import { ProductModel } from "../models/product.js";
import { UserModel } from "../models/user.js";

export const categoryByIdExist = async (id = "") => {
  const categoryById = await CategoryModel.findById(id).lean().exec();
  if (!categoryById) {
    throw new Error(`El ID: ${id} no existe`);
  }
  return true;
};

export const productByIdExist = async (id = "") => {
  const productById = await ProductModel.findById(id).lean().exec();
  if (!productById) {
    throw new Error(`El ID: ${id} no existe`);
  }
  return true;
};

export const emailExist = async (email = "") => {
  const existEmail = await UserModel.findOne({ email }).lean().exec();
  if (existEmail) {
    throw new Error(`El email: ${email} ya esta registrado`);
  }
  return true;
};

export const userByIdExist = async (id = "") => {
  const userById = await UserModel.findById(id).lean().exec();
  if (!userById) {
    throw new Error(`El ID: ${id} no existe`);
  }
};

export const cartByIdExist = async (id = "") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("El ID no es válido");
  }
  const cartById = await CartModel.findById(id).lean().exec();
  if (!cartById) {
    throw new Error(`El carrito con el ID ${id} no existe`);
  }
  return true;
};
