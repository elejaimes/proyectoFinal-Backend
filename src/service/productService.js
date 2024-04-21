import { productDAO } from "../dao/indexDAO.js";

export const getAllProducts = async (filterState, limit, since) => {
  try {
    const { products, totalProducts } = await productDAO.getAllProducts(
      filterState,
      limit,
      since
    );
    return { products, totalProducts };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductByName = async (name) => {
  try {
    const product = await productDAO.getProductByName(name);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const product = await productDAO.getProductById(id);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postProduct = async (product) => {
  try {
    const newProduct = await productDAO.postProduct(product);
    return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editProduct = async (id) => {
  try {
    const editProduct = await productDAO.editProduct(id);
    return editProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct_post = async (id, body) => {
  try {
    const updateProduct_post = await productDAO.updateProduct_post(id, body);
    return updateProduct_post;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const productDeleted = await productDAO.deleteProduct(id);
    return productDeleted;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductByCategory = async (categoryId, limit, since) => {
  try {
    const getProductByCategory = await productDAO.getProductByCategory(
      categoryId,
      limit,
      since
    );
    return getProductByCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductStock = async (productId, quantity) => {
  try {
    const updatedProduct = await productDAO.updateProductStock(
      productId,
      quantity
    );
    return updatedProduct;
  } catch (error) {
    throw new Error(
      `Error in productService/updateProductStock: ${error.message}`
    );
  }
};
