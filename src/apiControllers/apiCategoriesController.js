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

    res.status(200).json({ status: "Ok", totalCategories, categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const name = req.body.name.toUpperCase();
    const existCategory = await categoryService.getCategoryByName(name);

    if (existCategory) {
      return res
        .status(400)
        .json({ message: `La categoría ${existCategory.name} ya existe` });
    }

    const newCategory = categoryDTO(name);
    const categoryCreated = await categoryService.postCategory(newCategory);

    res
      .status(201)
      .json({ status: "Ok", message: "Categoría creada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await categoryService.updateCategory_post(id, {
      name,
    });

    res
      .status(200)
      .json({ status: "Ok", message: "Categoría modificada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await categoryService.deleteCategory(id);

    res
      .status(200)
      .json({ status: "Ok", message: "Categoría eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
