import { Schema, model } from "mongoose";

//Nombre de la colección
const collection = "Image";

// Define el esquema de los productos
const imageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  },
  { timestamps: true, versionKey: false }
);

export const ImageModel = model(collection, imageSchema);
