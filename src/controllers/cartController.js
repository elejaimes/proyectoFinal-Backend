import { cartService } from "../service/indexService.js";
import { logger } from "../config/winston/logger.js";
import { calculateTotal } from "../utils/cartsUtils.js";

export const getAllCarts = async (req, res) => {
  try {
    const { limit = 10, since = 0, filterState } = req.query;

    let message = "";
    let filterAllChecked = "";
    let filterActiveChecked = "";
    let filterInactiveChecked = "";

    if (filterState === "") {
      message = "Todos los carritos";
      filterAllChecked = "checked";
    } else if (filterState === "true") {
      message = "Carritos Activos";
      filterActiveChecked = "checked";
    } else if (filterState === "false") {
      message = "Carritos Inactivos";
      filterInactiveChecked = "checked";
    }

    const { carts, totalCarts } = await cartService.getAllCarts(
      filterState,
      limit,
      since
    );

    return res.render("adminPanel_carts", {
      title: "Carritos",
      status: "Ok",
      message,
      method: req.method,
      totalCarts,
      carts,
      filterState,
      filterAllChecked,
      filterActiveChecked,
      filterInactiveChecked,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

//Ver detalle de carrito

export const cartDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const cartDetail = await cartService.findCartById(id);

    return res.render("adminPanel_carts", {
      title: `Carrito de ${user.name}`,
      cartDetail,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/categorias");
  }
};

// Borrar Carrito completamente por el admin
export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deleteCart = await cartService.deleteCart(id);
    if (!deleteCart) {
      throw new Error("El carrito no pudo ser eliminado", error.message);
    }
    req.flash("successMessages", "Carrito eliminado exitosamente");
    res.redirect(`/carts`);
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/carts");
  }
};

// Obtener detalles del carrito asociado al usuario autenticado
export const showUserCart = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // 1. Obtener el ID del usuario autenticado
      const userId = req.user._id;
      console.log("UserID:", userId);

      // 2. Buscar el carrito asociado al usuario autenticado
      const cart = await cartService.findCartByUserId(userId);
      console.log("Cart:", cart);

      const total = calculateTotal(cart.cartItems);

      // 3. Renderizar la vista del carrito
      res.render("cart", { cart, total });
    } else {
      // Si no hay un usuario autenticado, redirigir al inicio de sesión o enviar un error
      res.status(401).send("No hay usuario autenticado");
    }
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

// Agregar Producto al Carrito
export const addProductsToCart = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const userId = req.user._id;
      console.log("ID de usuario autenticado:", userId);

      const { quantity } = req.body;
      const productId = req.params.productId; // Obtener el productId de los parámetros de la URL
      console.log("Datos del producto:", productId, quantity);

      const cart = await cartService.findCartByUserId(userId);
      console.log("Carrito encontrado:", cart);

      const updatedCart = await cartService.addProductsToCart(
        userId,
        productId,
        quantity
      );
      console.log("Carrito actualizado:", updatedCart);

      req.flash("successMessages", "Producto agregado exitosamente al carrito");
      res.redirect(`/cart`);
    } else {
      console.log("No hay usuario autenticado");
      res.status(401).send("No hay usuario autenticado");
    }
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
    req.flash("errorMessages", "Error al agregar el producto al carrito");
    res.redirect(`/`);
  }
};

// Actualizar Cantidad Productos en el carrito
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartId = await cartService.findCartByUserId(userId);
    const { productId } = req.params;
    const { quantity } = req.body;

    console.log("Datos recibidos:", cartId, productId, quantity);
    const updatedCart = await cartService.updateQuantity(
      cartId,
      productId,
      quantity
    );

    console.log("Carrito actualizado:", updatedCart);

    res.redirect(`/cart`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// // Eliminar Producto de Forma Individual
// export const removeProductFromCart = async (req, res) => {
//   try {
//     const { cartId, productId } = req.params;
//     const updatedCart = await cartService.removeProductFromCart(cartId, productId);
//     res.status(200).json(updatedCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Recuperar Carrito Completo
// export const getFullCart = async (req, res) => {
//   try {
//     const { cartId } = req.params;
//     const fullCart = await cartService.getFullCart(cartId);
//     res.status(200).json(fullCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Actualizar Carrito
// export const updateCart = async (req, res) => {
//   try {
//     const { cartId } = req.params;
//     const { newCartData } = req.body;
//     const updatedCart = await cartService.updateCart(cartId, newCartData);
//     res.status(200).json(updatedCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Guardar Carrito
// export const saveCart = async (req, res) => {
//   try {
//     const { cartId } = req.params;
//     await cartService.saveCart(cartId);
//     res.status(204).end();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
