export const getSession = (req) => {
  return req.session;
};

export const shortenDescription = (description) => {
  return description.substring(0, 500);
};

export const formatPrices = (price) => {
  return new Intl.NumberFormat().format(price);
};
