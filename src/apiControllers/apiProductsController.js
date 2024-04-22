import { logger } from "../config/winston/logger.js";
import { categoryService, productService } from "../service/indexService.js";
import { productDTO } from "../dto/productDTO.js";

// Función para renderizar productos
export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, since = 0, filterState } = req.query;

    const { products, totalProducts } = await productService.getAllProducts(
      filterState,
      limit,
      since
    );

    res.status(200).json({
      status: "Ok",
      message: "Productos obtenidos exitosamente",
      totalProducts,
      products,
      filterState,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { categoryList, name, price, description, stock } = req.body;

    const existProduct = await productService.getProductByName(name);
    if (existProduct) {
      return res.status(400).json({
        message: `El producto ${existProduct.name} ya existe`,
      });
    }

    const productFields = {
      category: categoryList,
      name,
      price,
      description,
      stock,
    };
    const newProduct = productDTO(productFields);
    const productCreated = await productService.postProduct(newProduct);

    res.status(201).json({
      status: "Ok",
      message: "Producto creado exitosamente",
      product: productCreated,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const productDetails = await productService.getProductById(productId);
    res.status(200).json({
      status: "Ok",
      message: "Producto obtenido exitosamente",
      product: productDetails,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, name, price, description, stock, state } = req.body;

    const updateProduct = await productService.updateProduct_post(id, {
      category,
      name,
      price,
      description,
      stock,
      state,
    });

    res.status(200).json({
      status: "Ok",
      message: "Producto modificado exitosamente",
      product: updateProduct,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await productService.deleteProduct(id);
    if (!deleteProduct) {
      throw new Error("Error desconocido");
    }

    res.status(200).json({
      status: "Ok",
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10, since = 0 } = req.query;

    const category = await categoryService.categoryById(id);
    const categoryName = category ? category.name : "Categoría desconocida";

    const [products, totalProducts] = await productService.getProductByCategory(
      id,
      limit,
      since
    );

    res.status(200).json({
      status: "Ok",
      message: `Productos por la categoría: ${categoryName}`,
      totalProducts,
      products,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
