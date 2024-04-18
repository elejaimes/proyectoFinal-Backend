import { cartDAO } from "../dao/indexDAO.js";

export const getAllCarts = async (filterState, limit, since) => {
  try {
    const { carts, totalcarts } = await cartDAO.getAllCarts(
      filterState,
      limit,
      since
    );
    return { carts, totalcarts };
  } catch (error) {
    throw new Error(`Error in cartService/getAllCarts: ${error.message}`);
  }
};

export const findCartById = async (id) => {
  try {
    const cart = await cartDAO.findCartById(id);
    return cart;
  } catch (error) {
    throw new Error(`Error in cartService/findCartById: ${error.message}`);
  }
};

export const findCartByUserId = async (userId) => {
  try {
    const cart = await cartDAO.findCartByUserId(userId);
    return cart;
  } catch (error) {
    throw new Error(`Error al buscar el carrito del usuario: ${error.message}`);
  }
};

export const createCart = async (userId) => {
  try {
    const newCart = cartDAO.createCart(userId);
    return newCart;
  } catch (error) {
    throw new Error(`Error in cartService/createCart: ${error.message}`);
  }
};

export const deleteCart = async (id) => {
  try {
    const deletedCart = await cartDAO.deleteCart(id);
    return deletedCart;
  } catch (error) {
    throw new Error(`Error in cartService/deleteCart: ${error.message}`);
  }
};

export const addProductsToCart = async (cartId, products) => {
  try {
    return await cartDAO.addProductsToCart(cartId, products);
  } catch (error) {
    throw new Error(`Error in cartService/addProductsToCart: ${error.message}`);
  }
};

export const updateProductInCart = async (
  cartId,
  productId,
  newQuantity,
  newPrice
) => {
  try {
    return await cartDAO.updateProductInCart(
      cartId,
      productId,
      newQuantity,
      newPrice
    );
  } catch (error) {
    throw new Error(
      `Error in cartService/updateProductInCart: ${error.message}`
    );
  }
};

export const removeProductFromCart = async (cartId, productId) => {
  try {
    return await cartDAO.removeProductFromCart(cartId, productId);
  } catch (error) {
    throw new Error(
      `Error in cartService/removeProductFromCart: ${error.message}`
    );
  }
};

export const createUserCart = async (userId) => {
  try {
    return await cartDAO.createUserCart(userId);
  } catch (error) {
    throw new Error(`Error in cartService/createUserCart: ${error.message}`);
  }
};

export const associateUserCart = async (userId, cartId) => {
  try {
    await cartDAO.associateUserCart(userId, cartId);
  } catch (error) {
    throw new Error(`Error in cartService/associateUserCart: ${error.message}`);
  }
};
