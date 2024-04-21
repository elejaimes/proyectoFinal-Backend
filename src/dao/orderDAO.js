import { OrderModel } from "../models/order.js";

export const findOrderByUserId = async (userId) => {
  try {
    const order = await OrderModel.findOne({ user: userId })
      .populate({
        path: "purchase",
        populate: {
          path: "cartItems._id",
          model: "Products",
          select: "name price",
        },
      })
      .populate({
        path: "user",
        select: "name email rol address",
      })
      .lean();
    return order;
  } catch (error) {
    throw new Error(
      `Error en la búsqueda de la orden de compra por ID de usuario: ${error.message}`
    );
  }
};

export const createOrder = async (orderData) => {
  try {
    const order = await OrderModel.create(orderData);
    return order;
  } catch (error) {
    throw new Error(`Error creating order: ${error.message}`);
  }
};
