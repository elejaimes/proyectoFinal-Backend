// Función para calcular el total del carrito
export function calculateTotal(cartItems) {
  // Verificar si hay elementos en el carrito
  if (!cartItems || cartItems.length === 0) {
    return 0;
  }

  // Sumar los precios totales por producto
  const total = cartItems.reduce((acc, item) => {
    const itemTotal = item._id.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  return total.toFixed(2); // Redondear a dos decimales
}
