import { validationResult } from "express-validator";
import { logger } from "../config/winston/logger.js";
import { categoryService, productService } from "../service/indexService.js";
import { productDTO } from "../dto/productDTO.js";

export const getProducts = async (req, res) => {
  try {
    const { limit = 10, since = 0 } = req.query;

    const [products, totalProducts] = await productService.getAllProducts(
      limit,
      since
    );
    console.log(products);

    return res.render("products", {
      title: "Todos Los Productos",
      status: "Ok",
      message: "Productos Activos",
      method: req.method,
      totalProducts,
      products,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

export const getProducts_add = async (req, res) => {
  try {
    const categoryList = await categoryService.getCategoryList();
    return res.render("adminPanel_createProducts", {
      title: "Crear producto",
      categoryList,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/todos-los-productos/add");
  }
};

export const postProducts = async (req, res) => {
  try {
    const { categoryList, name, price, description, stock } = req.body;
    console.log(req.body);

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

    req.flash("successMessages", "Producto creado exitosamente");
    res.redirect("/productos/todos-los-productos/add");
  } catch (error) {
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/todos-los-productos/add");
  }
};

//para el evento click de ver detelles en el card
export const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const productDetails = await productService.getProductById(productId);
    res.render("products", { productDetails });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/todos-los-productos");
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const editProduct = await productService.editProduct(id);
    const categoryList = await categoryService.getCategoryList();

    return res.render("adminPanel_editProduct", {
      title: "Editar producto",
      editProduct,
      categoryList,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/todos-los-productos");
  }
};

export const updateProduct_post = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, name, price, description, stock } = req.body;

    const updateProduct = await productService.updateProduct_post(id, {
      category,
      name,
      price,
      description,
      stock,
    });
    req.flash("successMessages", "Producto modificado exitosamente");
    res.redirect(`/productos/todos-los-productos/edit/${id}`);
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/todos-los-productos");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const deleteProduct = await productService.deleteProduct(id);
    if (!deleteProduct) {
      throw new Error("Error desconocido:", error.message);
    }
    req.flash("successMessages", "Producto eliminado exitosamente");
    res.redirect(`/productos/todos-los-productos`);
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    console.error(error.message);
    return res.redirect("/productos/todos-los-productos");
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const categoryById = await categoryService.categoryById(id);
    const { limit = 10, since = 0 } = req.query;

    const [products, totalProducts] = await productService.getProductByCategory(
      id,
      limit,
      since
    );

    return res.render("products", {
      title: `Productos por la categoría: ${categoryById.name}`,
      status: "Ok",
      message: "Productos Activos",
      method: req.method,
      totalProducts,
      products,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/categorias");
  }
};
