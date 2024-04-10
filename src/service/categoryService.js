import { categoryDAO } from "../dao/indexDAO.js";

export const getCategories = async (limit, since) => {
  try {
    const allCategories = await categoryDAO.getCategories(limit, since);
    return allCategories;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategoryList = async () => {
  try {
    const categoryList = await categoryDAO.getCategoryList();
    return categoryList;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategoryByName = async (name) => {
  try {
    const categoryName = await categoryDAO.getCategoryByName(name);
    return categoryName;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postCategory = async (name) => {
  try {
    const newCategory = await categoryDAO.postCategory(name);
    return newCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const categoryById = async (id) => {
  try {
    const editCategory = await categoryDAO.categoryById(id);
    return editCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCategory_post = async (id, body) => {
  try {
    const updateCategory_post = await categoryDAO.updateCategory_post(id, body);
    return updateCategory_post;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    const deleteCategory = await categoryDAO.deleteCategory(id);
    return deleteCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};
