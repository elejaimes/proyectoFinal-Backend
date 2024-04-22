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

    res.render("order", { order, userId });
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

export const showTicket = async (req, res) => {
  try {
    const user = req.user._id;

    // Buscar la orden de compra por ID de usuario
    const order = await orderService.findOrderByUserId(user);

    // Verificar si se encontró la orden
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    // Renderizar la vista del ticket
    res.render("ticket", {
      userEmail: order.user.email,
      orderCode: order._id,
      purchaseTime: order.createdAt,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Error al mostrar el ticket:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
