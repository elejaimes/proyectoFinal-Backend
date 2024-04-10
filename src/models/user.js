import { Schema, model } from "mongoose";
import slug from "slug";

const collection = "Users";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El mail es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatorio"],
    },
    address: {
      type: String,
      required: [true, "La dirección es obligatoria"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Roles",
    },
    state: {
      type: Boolean,
      default: true,
      description: "Estado del usuario (activo/inactivo)",
    },
    slug: {
      type: String,
      unique: true,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", function (next) {
  this.slug = `${slug(this.name)}`;
  next();
});

export const UserModel = model(collection, userSchema);
