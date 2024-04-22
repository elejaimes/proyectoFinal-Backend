export const getSession = (req) => {
  return req.session;
};

export const shortenDescription = (description) => {
  return description.substring(0, 500);
};

export const formatPrices = (price) => {
  return new Intl.NumberFormat().format(price);
};

export const multiply = (a, b) => {
  return a * b;
};

export const formatPurchaseTime = (purchaseTime) => {
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const formattedTime = new Date(purchaseTime).toLocaleString("es-CL", options);
  return formattedTime;
};
