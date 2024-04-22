import {
  cartService,
  orderService,
  userService,
} from "../service/indexService.js";

// Obtener detalles de la orden asociado al usuario autenticado
export const showUserOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const order = await orderService.findOrderByUserId(userId);

    if (order) {
      res.status(200).json(order);
    } else {
      res
        .status(404)
        .json({ error: "No se encontró ninguna orden para el usuario" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await cartService.findCartByUserId(userId);
    const { address } = await userService.getUserById(userId);

    const order = await orderService.createOrder(userId, cartItems, address);

    console.log("La orden es: ", order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
