import { ProductModel } from "../models/product.js";

export const getAllProducts = async (filterState, limit, since) => {
  try {
    let filter = {}; // Filtro vacío por defecto para obtener todos los productos
    if (filterState !== undefined && filterState !== "") {
      filter = { state: filterState }; // Aplicar filtro por estado si se proporciona y no está vacío
    }
    const products = await ProductModel.find(filter)
      .populate("category", "name")
      .limit(Number(limit))
      .skip(Number(since))
      .sort({ name: 1 })
      .lean();

    const totalProducts = await ProductModel.countDocuments(filter).exec();

    return { products, totalProducts };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductByName = async (name) => {
  try {
    const product = await ProductModel.findOne({ name }).lean().exec();
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const product = await ProductModel.findById({ _id: id }).lean().exec();
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postProduct = async (product) => {
  try {
    const newProduct = new ProductModel(product);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editProduct = async (id) => {
  try {
    const editProduct = await ProductModel.findById(id).lean();
    return editProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct_post = async (id, rest) => {
  try {
    const updateProduct_post = await ProductModel.findByIdAndUpdate(
      id,
      { $set: rest },
      { new: true }
    );
    return updateProduct_post;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const deleteProduct = await ProductModel.findOneAndDelete({ _id: id });
    return deleteProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductByCategory = async (categoryId, limit, since) => {
  try {
    const activProduct = { state: true };
    const [products, totalProducts] = await Promise.all([
      ProductModel.find({ category: categoryId, ...activProduct }) // Filtra por el ID de la categoría
        .populate("category", "name")
        .limit(Number(limit))
        .skip(Number(since))
        .sort({ name: 1 })
        .lean(),
      ProductModel.countDocuments({ category: categoryId, ...activProduct }), // También cuenta los documentos filtrados
    ]);

    return [products, totalProducts];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductStock = async (productId, quantity) => {
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new Error(`Product not found with id ${productId}`);
    }

    product.stock += quantity;
    await product.save();
  } catch (error) {
    throw new Error(`Error updating product stock: ${error.message}`);
  }
};
