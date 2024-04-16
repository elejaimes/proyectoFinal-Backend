import { cartService } from "../service/indexService.js";
import { logger } from "../config/winston/logger.js";

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

// // Buscar Carrito por ID
// export const getCartById = async (req, res) => {
//   try {
//     const { cartId } = req.params;
//     const cart = await cartService.findCartById(cartId);
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Buscar Carrito por ID de Usuario
// export const getCartByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const cart = await cartService.findCartByUserId(userId);
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Crear Carrito
// export const createCart = async (req, res) => {
//   try {
//     const { userId } = req.body; // Suponiendo que el ID del usuario se pasa en el cuerpo de la solicitud
//     const newCart = await cartService.createCart(userId);
//     res.status(201).json(newCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Borrar Carrito completamente
// export const deleteCart = async (req, res) => {
//   try {
//     const { cartId } = req.params;
//     await cartService.deleteCart(cartId);
//     res.status(204).end();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Agregar Producto al Carrito
// export const addProductsToCart = async (req, res) => {
//   try {
//     const { cartId } = req.params;
//     const { products } = req.body;
//     const updatedCart = await cartService.addProductsToCart(cartId, products);
//     res.status(200).json(updatedCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Actualizar Cantidad y Precios de Productos
// export const updateProductInCart = async (req, res) => {
//   try {
//     const { cartId, productId } = req.params;
//     const { newQuantity, newPrice } = req.body;
//     const updatedCart = await cartService.updateProductInCart(cartId, productId, newQuantity, newPrice);
//     res.status(200).json(updatedCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
