import { orderDAO } from "../dao/indexDAO.js";
import { productService } from "../service/indexService.js";

export const findOrderByUserId = async (userId) => {
  try {
    const order = await orderDAO.findOrderByUserId(userId);
    return order;
  } catch (error) {
    throw new Error(
      `Error en la búsqueda de la orden de compra por ID de usuario: ${error.message}`
    );
  }
};

export const createOrder = async (user, cartItems, address) => {
  try {
    const productsCart = cartItems.cartItems;

    console.log("cartItems es: ", productsCart);
    const insufficientStockItems = await checkStock(productsCart);
    if (insufficientStockItems.length > 0) {
      throw new Error(
        `Stock insuficiente para algunos productos: ${insufficientStockItems}`
      );
    }

    const order = await orderDAO.createOrder({
      user,
      purchase: cartItems,
      address,
      amount: totalAmount(productsCart),
    });

    await updateStock(productsCart);

    return order;
  } catch (error) {
    throw new Error(`Error creating order: ${error.message}`);
  }
};

const checkStock = async (cartItems) => {
  const insufficientStockItems = [];
  for (const item of cartItems) {
    const productId = item._id._id;
    const product = await productService.getProductById(productId);
    if (!product || product.stock < item.quantity) {
      insufficientStockItems.push(item);
    }
  }
  return insufficientStockItems;
};

const updateStock = async (cartItems) => {
  for (const item of cartItems) {
    await productService.updateProductStock(item._id._id, -item.quantity); // Accede correctamente al _id del producto
  }
};

const totalAmount = (cartItems) => {
  let total = 0;
  for (const item of cartItems) {
    // Multiplica el precio del producto por la cantidad y suma al total
    total += item._id.price * item.quantity;
  }
  return total;
};
