import { Schema, model } from "mongoose";
import slug from "slug";

//Nombre de la colección
const collection = "Products";

// Define el esquema de los productos
export const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      unique: true,
    },

    slug: {
      type: String,
      unique: true,
      required: false,
    },

    state: {
      type: Boolean,
      default: true,
      required: true,
      description: "Estado del producto (activo/inactivo)",
    },

    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: [true, "La categoria es obligatoria"],
    },

    description: {
      type: String,
      required: [true, "La descripcción es obligatoria"],
    },

    available: {
      type: Boolean,
      default: true,
    },

    stock: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);
productSchema.pre("save", function (next) {
  this.slug = `${slug(this.name)}`;
  next();
});

export const ProductModel = model(collection, productSchema);
