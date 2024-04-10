import { Schema, model } from "mongoose";
import slug from "slug";

//Nombre de la colección
const collection = "Categories";

// Define el esquema de los productos
const categorySchema = new Schema(
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
      description: "Estado de la categoria (activo/inactivo)",
    },
  },
  {
    timestamps: true,
    strict: "throw",
    versionKey: false,
  }
);
categorySchema.pre("save", function (next) {
  this.slug = `${slug(this.name)}`;
  next();
});

export const CategoryModel = model(collection, categorySchema);
