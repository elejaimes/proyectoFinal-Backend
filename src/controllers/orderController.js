import {
  cartService,
  orderService,
  userService,
} from "../service/indexService.js";

// Obtener detalles de la orden asociado al usuario autenticado
export const showUserOrder = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userId = req.user._id;

      const order = await orderService.findOrderByUserId(userId);

      res.render("order", { order, userId });
    } else {
      res.status(401).send("No hay usuario autenticado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export const createOrder = async (req, res) => {
  try {
    const user = req.user._id;
    const cartItems = await cartService.findCartByUserId(user);
    const { address } = await userService.getUserById(user);

    const order = await orderService.createOrder(user, cartItems, address);

    console.log("La orden es: ", order);

    res.redirect("/order");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
