import { CategoryModel } from "../models/category.js";

export const getCategories = async (limit, since) => {
  try {
    const activCategory = { state: true };
    const [categories, totalCategories] = await Promise.all([
      CategoryModel.find(activCategory)
        .limit(Number(limit))
        .skip(Number(since))
        .sort({ name: 1 })
        .lean(),
      CategoryModel.countDocuments(activCategory),
    ]);

    return [categories, totalCategories];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategoryList = async () => {
  try {
    const categoryList = await CategoryModel.find().lean();
    return categoryList;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategoryByName = async ({ name }) => {
  try {
    const categoryName = await CategoryModel.findOne({ name }).lean().exec();
    return categoryName;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postCategory = async ({ name }) => {
  try {
    const newCategory = new CategoryModel({ name });
    await newCategory.save();
    return newCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const categoryById = async (id) => {
  try {
    const editCategory = await CategoryModel.findById(id).lean();
    return editCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCategory_post = async (id, body) => {
  try {
    const updateCategory_post = await CategoryModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );
    return updateCategory_post;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    const deleteCategory = await CategoryModel.findOneAndDelete({ _id: id });
    return deleteCategory;
  } catch (error) {
    throw new Error(error.message);
  }
};
