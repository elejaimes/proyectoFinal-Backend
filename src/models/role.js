import { Schema, model } from "mongoose";

const collection = "Roles";

const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, "El rol es obligatorio"],
    },
  },
  { timestamps: true, versionKey: false }
);

export const RoleModel = model(collection, roleSchema);
