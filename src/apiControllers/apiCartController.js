import { cartService } from "../service/indexService.js";
import { logger } from "../config/winston/logger.js";
import { calculateTotal } from "../utils/cartsUtils.js";

// getAllCarts - Controlador
export const getAllCarts = async (req, res) => {
  try {
    const { limit = 10, since = 0, filterState } = req.query;
    const { carts, totalCarts } = await cartService.getAllCarts(
      filterState,
      limit,
      since
    );

    res.status(200).json({
      status: "Ok",
      totalCarts,
      carts,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// cartDetail - Controlador

export const cartDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const cartDetail = await cartService.findCartById(id);

    res.status(200).json({
      status: "Ok",
      cartDetail,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// deleteCart - Controlador
export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCart = await cartService.deleteCart(id);

    res.status(200).json({
      status: "Ok",
      message: "Carrito eliminado exitosamente",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// showUserCart - Controlador
export const showUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartService.findCartByUserId(userId);
    const total = calculateTotal(cart.cartItems);

    res.status(200).json({
      status: "Ok",
      cart,
      total,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Agregar Producto al Carrito
export const addProductsToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { quantity } = req.body;
    const productId = req.params.productId;

    const updatedCart = await cartService.addProductsToCart(
      userId,
      productId,
      quantity
    );

    res.status(200).json({
      status: "Ok",
      message: "Producto agregado exitosamente al carrito",
      updatedCart,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// updateQuantity - Controlador
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartId = await cartService.findCartByUserId(userId);
    const { productId } = req.params;
    const { quantity } = req.body;

    const updatedCart = await cartService.updateQuantity(
      cartId,
      productId,
      quantity
    );

    res.status(200).json({
      status: "Ok",
      updatedCart,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// removeProductFromCart - Controlador
export const removeProductFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartId = await cartService.findCartByUserId(userId);
    const { productId } = req.params;

    const updatedCart = await cartService.removeProductFromCart(
      cartId,
      productId
    );

    res.status(200).json({
      status: "Ok",
      message: "Producto eliminado exitosamente del carrito",
      updatedCart,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
