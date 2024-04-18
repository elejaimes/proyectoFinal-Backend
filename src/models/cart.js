import { Schema, model } from "mongoose";

//Nombre de la colección
const collection = "Carts";

// Define el esquema de los productos
const cartSchema = new Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products", // Referencia al modelo de productos
      },
    ],

    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    state: {
      type: Boolean,
      default: true,
      required: true,
      description: "Estado del carrito de compras (activo/inactivo)",
    },
  },
  { timestamps: true, versionKey: false }
);

export const CartModel = model(collection, cartSchema);
