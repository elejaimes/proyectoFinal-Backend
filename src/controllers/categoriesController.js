import { logger } from "../config/winston/logger.js";
import { validationResult } from "express-validator";
import { categoryDTO } from "../dto/categoryDTO.js";
import { categoryService } from "../service/indexService.js";

export const getCategories = async (req, res) => {
  try {
    const { limit = 10, since = 0 } = req.query;

    const [categories, totalCategories] = await categoryService.getCategories(
      limit,
      since
    );
    console.log(categories);

    console.log(totalCategories);

    return res.render("categories", {
      title: "Categorías",
      status: "Ok",
      message: "Categorias Activas",
      method: req.method,
      totalCategories,
      categories,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/");
  }
};

export const getCategories_add = (req, res) => {
  try {
    return res.render("categoryForm", { title: "Crear categoría" });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/categorias/add");
  }
};

export const postCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errorMessages", errors.array());
    return res.redirect("/productos/categorias/add");
  }

  try {
    const name = req.body.name.toUpperCase();

    const existCategory = await categoryService.getCategoryByName(name);
    if (existCategory) {
      return res.status(400).json({
        message: `La categoría ${existCategory.name} ya existe`,
      });
    }

    const newCategory = categoryDTO(name);
    const categoryCreated = await categoryService.postCategory(newCategory);

    req.flash("successMessages", "Categoría creada exitosamente");
    res.redirect("/productos/categorias/add");
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/categorias/add");
  }
};

export const editCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const editCategory = await categoryService.categoryById(id);

    return res.render("categoryFormEdit", {
      title: "Editar categoría",
      editCategory,
    });
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/categorias");
  }
};

export const updateCategory_post = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updateCategory_post = await categoryService.updateCategory_post(id, {
      name,
    });
    req.flash("successMessages", "Categoría modificada exitosamente");
    res.redirect(`/productos/categorias/edit/${id}`);
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/categorias");
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const deleteCategory = await categoryService.deleteCategory(id);
    if (!deleteCategory) {
      throw new Error("Error desconocido:", error.message);
    }
    req.flash("successMessages", "Categoría eliminada exitosamente");
    res.redirect(`/productos/categorias`);
  } catch (error) {
    logger.error(error.message);
    req.flash("errorMessages", [{ msg: error.message }]);
    return res.redirect("/productos/categorias");
  }
};
