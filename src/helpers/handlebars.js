export const shortenDescription = (description) => {
  return description.substring(0, 500);
};

export const formatPrices = (price) => {
  return new Intl.NumberFormat().format(price);
};

export const activeFilter = function (value) {
  // Lógica para determinar si el filtro está activo
  if (value) {
    return "checked"; // Si el valor es verdadero, retorna 'checked'
  } else {
    return ""; // Si el valor es falso, retorna una cadena vacía
  }
};
