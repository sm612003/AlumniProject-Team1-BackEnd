//const Category = require('./CategoryModel');

import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getCategoryById = async (req, res) => {
  const { categoryId } = res.params;
  try {
    const category = await Category.findById(categoryId);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const addCategory = async (req, res) => {
  console.log("POST");
  const { name } = req.body;
  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "error adding category" });
    console.log(error);
  }
};


export const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: `Category  deleted successfully` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
