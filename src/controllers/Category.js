import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//here we are exporting an asynchronous function  named getAllCategories
export const getAllCategories = async (req, res) => {
  try {
    //this code aims to find all categories
    const categories = await prisma.Category.find()
    //if the categories are found it will return the list of categories with a 200 status
    res.status(200).json(categories);
  } catch (error) {
    //if an error occurs, an error message will be returned with a 404 status
    res.status(404).json({ message: error.message });
  }
};

//here we are exporting an asynchronous function  named getCategoryById
export const getCategoryById = async (req, res) => {
  //extracting the id from the request body 
  const id = req.body.id;
  try {
    // console.log(id)
    // //checking if the provided categoryId is a valid mongodb objectID
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //   //If not valid, respond with a 400 status and an error message
    //   return res.status(400).json({ message: 'Invalid category ID' });
    // }
    //this code aims to find a category by the provided ID
    const category = await prisma.Category.findUnique({where:{id:id}});
    //if category is found respond with a 200 status with the provided ID
    res.status(200).json(category);
  } catch (error) {
    //If an error occurs, respond with a 404 status and an error message
    res.status(404).json({ message: error.message });
  }
};

// Exporting an asynchronous function named 'getCategoryByName'
export const getCategoryByName = async ( req , res) => {
  // Extracting 'categoryName' from the request body
  const categoryName = req.body.categoryName
  try{
    //this code aims to find a category by its name
    const category = await prisma.Category.findUnique({where:{name:categoryName}});
    // If category is not found, respond with a 404 status and an error message
    if(!category){
      return res.status(404).json({message: "Category not found"});
    }
    // If category is found, respond with a 200 status and the category object
    return res.status(200).json(category);
  }
  catch(error){
    // If an error occurs, respond with a 500 status and an error message
    return res.status(500).json({message: error.message});

  }
}


export const addCategory = async (req, res) => {
  console.log("POST");
  // Extracting 'name' from the request body
  const name = req.body.name ;
  try {
    console.log(name)
    // Check if 'name' is provided, is a string, and is not empty
    if (!name) {
      return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
    }
    // Create a new category using the provided 'name'
    const addedCategory = await prisma.Category.create({
      data: {
        name:name
        },
    })

    // Respond with a 200 status and the newly created category
    res.status(200).json(addedCategory);
  } catch (error) {
    // If an error occurs, respond with a 500 status and an error message
    res.status(500).json({ error: "error adding category" });
    // Log the error for further investigation
    console.log(error);
  }
};

// Exporting an asynchronous function named 'deleteCategoryById'
export const deleteCategoryById = async (req, res) => {
  // Extracting 'id' from the request body
  const id = req.body.id;
  try {
    // Attempt to find and delete a category by its ID
    const deleteCategory = await prisma.Category.delete({where:{id:id}});
    // If category is not found, respond with a 404 status and an error message
    if (!deleteCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    // If category is found and deleted, respond with a 200 status and a success message
    return res.status(200).json({ 
      message: `Category  deleted successfully`,
      data : deleteCategory
    });
  } catch (error) {
    // If an error occurs, respond with a 404 status and an error message
    return res.status(404).json({ message: error.message });
  }
};
