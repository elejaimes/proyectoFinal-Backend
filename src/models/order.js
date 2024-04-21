import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";

const collection = "Orders";

const OrderSchema = new Schema(
  {
    purchase: [
      {
        type: Schema.Types.ObjectId,
        ref: "Carts",
        required: true,
      },
    ],
    code: {
      type: String,
      default: () => randomUUID(),
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const OrderModel = model(collection, OrderSchema);
