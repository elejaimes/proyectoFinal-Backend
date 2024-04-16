import { CartModel } from "../models/cart.js";

export const getAllCarts = async (filterState, limit, since) => {
  try {
    let filter = {}; // Filtro vacío por defecto para obtener todos los carritos
    if (filterState !== undefined && filterState !== "") {
      filter = { state: filterState }; // Aplicar filtro por estado si se proporciona y no está vacío
    }
    const carts = await CartModel.find(filter)
      .populate({
        path: "products",
        select: "name price",
      })
      .populate({
        path: "user",
        select: "name email rol",
      })
      .limit(Number(limit))
      .skip(Number(since))
      .sort({ name: 1 })
      .lean();

    const totalCarts = await CartModel.countDocuments(filter).exec();

    return { carts, totalCarts };
  } catch (error) {
    throw new Error(`Error in cartDAO/getAllCarts: ${error.message}`);
  }
};

export const findCartById = async (cartId) => {
  try {
    const cart = await CartModel.findById(cartId).populate("products").lean();
    return cart;
  } catch (error) {
    throw new Error(`Error in cartDAO/findCartById: ${error.message}`);
  }
};

export const findCartByUserId = async (userId) => {
  try {
    const cart = await CartModel.findOne({ user: userId })
      .populate("products")
      .lean();
    return cart;
  } catch (error) {
    throw new Error(`Error in cartDAO/findCartByUserId: ${error.message}`);
  }
};

export const createCart = async (userId) => {
  try {
    const cart = await CartModel.create({ user: userId });
    return cart;
  } catch (error) {
    throw new Error(`Error in cartDAO/createCart: ${error.message}`);
  }
};

export const deleteCart = async (cartId) => {
  try {
    await CartModel.findByIdAndDelete(cartId);
  } catch (error) {
    throw new Error(`Error in cartDAO/deleteCart: ${error.message}`);
  }
};

export const addProductsToCart = async (cartId, products) => {
  try {
    const cart = await CartModel.findByIdAndUpdate(
      cartId,
      { $push: { products: { $each: products } } },
      { new: true }
    );
    return cart;
  } catch (error) {
    throw new Error(`Error in cartDAO/addProductsToCart: ${error.message}`);
  }
};

export const updateProductInCart = async (
  cartId,
  productId,
  newQuantity,
  newPrice
) => {
  try {
    const cart = await CartModel.findOneAndUpdate(
      { _id: cartId, "products._id": productId },
      {
        $set: {
          "products.$.quantity": newQuantity,
          "products.$.price": newPrice,
        },
      },
      { new: true }
    );
    return cart;
  } catch (error) {
    throw new Error(`Error in cartDAO/updateProductInCart: ${error.message}`);
  }
};

export const removeProductFromCart = async (cartId, productId) => {
  try {
    const cart = await CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { _id: productId } } },
      { new: true }
    );
    return cart;
  } catch (error) {
    throw new Error(`Error in cartDAO/removeProductFromCart: ${error.message}`);
  }
};

export const getProductByCategory = async (categoryId, limit, since) => {
  try {
    const activProduct = { state: true };
    const [products, totalProducts] = await Promise.all([
      CartModel.find({ category: categoryId, ...activProduct }) // Filtra por el ID de la categoría
        .populate("category", "name")
        .limit(Number(limit))
        .skip(Number(since))
        .sort({ name: 1 })
        .lean(),
      CartModel.countDocuments({ category: categoryId, ...activProduct }), // También cuenta los documentos filtrados
    ]);

    return [products, totalProducts];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Cuando un usuario se registra en la aplicación, se crea un carrito asociado a ese usuario
export const createUserCart = async (userId) => {
  try {
    const cart = await CartModel.create({ user: userId });
    return cart;
  } catch (error) {
    throw new Error(`Error creating user cart: ${error.message}`);
  }
};

// Cuando un usuario inicia sesión, se asocia su carrito existente con su ID de usuario
export const associateUserCart = async (userId, cartId) => {
  try {
    await CartModel.findByIdAndUpdate(cartId, { user: userId });
  } catch (error) {
    throw new Error(`Error associating user cart: ${error.message}`);
  }
};
