import { CartModel } from "../models/cart.js";

export const getAllCarts = async (filterState, limit, since) => {
  try {
    let filter = {}; // Filtro vacío por defecto para obtener todos los carritos
    if (filterState !== undefined && filterState !== "") {
      filter = { state: filterState }; // Aplicar filtro por estado si se proporciona y no está vacío
    }
    const carts = await CartModel.find(filter)
      .populate({
        path: "cartItems._id",
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

export const findCartById = async (id) => {
  try {
    const cart = await CartModel.findById(id)
      .populate({
        path: "cartItems._id",
        select: "name price",
      })
      .populate({
        path: "user",
        select: "name email rol",
      })
      .lean();
    return cart;
  } catch (error) {
    throw new Error(`Error in cartDAO/findCartById: ${error.message}`);
  }
};

export const findCartByUserId = async (userId) => {
  try {
    console.log("Searching cart for userID:", userId);
    const cart = await CartModel.findOne({ user: userId })
      .populate({
        path: "cartItems._id",
        select: "name price",
      })
      .lean();
    console.log("Found cart:", cart);
    return cart;
  } catch (error) {
    throw new Error(
      `Error en la búsqueda del carrito por ID de usuario: ${error.message}`
    );
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

export const deleteCart = async (id) => {
  try {
    const deletedCart = await CartModel.findByIdAndDelete({ _id: id });
    return deletedCart;
  } catch (error) {
    throw new Error(`Error in cartDAO/deleteCart: ${error.message}`);
  }
};

export const addProductsToCart = async (userId, productId, quantity) => {
  try {
    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      throw new Error("No se encontró el carrito para el usuario");
    }

    const existingCartItem = cart.cartItems.find(
      (item) => String(item._id) === String(productId)
    );

    if (existingCartItem) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      existingCartItem.quantity += parseInt(quantity);
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.cartItems.push({ _id: productId, quantity });
    }

    const updatedCart = await cart.save();
    return updatedCart;
  } catch (error) {
    throw new Error(`Error al actualizar el carrito: ${error.message}`);
  }
};

export const updateProductInCart = async (
  cartId,
  _id,
  newQuantity,
  newPrice
) => {
  try {
    const cart = await CartModel.findOneAndUpdate(
      { _id: cartId, "products._id": _id },
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

export const removeProductFromCart = async (cartId, _id) => {
  try {
    const cart = await CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { _id: _id } } },
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
