import Blog from "../models/Blog.js";
import Category from "../models/Category.js";
import { upload } from "../middlewares/multer.js";
import path from "path";
import fs from "fs"


//add blog
export const addBlog = async (req, res) => {
  upload.single("image")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { author, title, content, category } = req.body;
    const image = req.file.path;

    try {
      const blog = new Blog({
        author,
        title,
        content,
        image,
        category: category,
      });
      const newBlog = await blog.save();
      res.status(200).json(newBlog);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });
};
//get the blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get blog by id

export const getBlogById = async (req, res) => {
  const  id  = req.body.id;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete blog by id

export const deleteBlog = async (req, res) => {
  const { id } = req.body;

  try {
    await Blog.findByIdAndRemove(id);
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Blog post not found or could not be deleted" });
  }
};

//update the blog by id

export const updateBlog = async (req, res) => {
  const  id  = req.body.id;
  upload.single("image")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // const { author, title, content, category } = req.body;

    try {

      const updatedData = req.body;
      const image = req.file.path;
      updatedData.image = image
      // Find the existing blog post by ID
      const updatedBlog = await Blog.findByIdAndUpdate(
        { _id: id },
        updatedData,
        { new: true }
      );


      res.status(200).json({ message: 'Blog updated successfully', data: updatedBlog });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
};

//filter by category

export const getBlogsByCategory= async (req,res)=>{
  const categoryName = req.params.name;
  try{
    const category = await Category.findOne({name: categoryName})
    console.log(category)
    if (!category){
      return res.status(404).json({message:"category not found"})
    }

    const blogs= await Blog.find({ category: category._id});
    res.status(201).json(blogs);

  }catch(error){
     res.status(500).json({error:error.message})
  }
}

// export const updateBlog = async (req, res) => {
//   const  id  = req.body.id;
//   console.log(id)
//   // Validation for he type of the news ID
//   if(!mongoose.Types.ObjectId.isValid(id)){
//     return res.status(404).json({
//       error: "News not found"
//     })
//   }
//   // Fetch the current news post
//   const newBlog = await Blog.findById(id)
//   // Delete the image from the local folder
//   fs.unlink(newBlog.image , (err)=> {
//     if(err){
//       return res.status(500).json({
//         error: `error updating the photo`
//       })
//     }
//   })
//   // Handle file upload and potential errors
//   upload.single('image')(req, res, async function (err){
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }    
//     try {
//       // Extract updated data from the request
//       const updatedData = req.body 
//       const image = req.file.path ;
//       updatedData.image = image ;
//       // Update the news post and respond with the updated data
//       const blogs = await Blog.findByIdAndUpdate(
//         {_id: id},
//         updatedData,
//         {new: true}
//       )
//       return res.json(blogs)   
//     } catch (error){
//     return res.status(500).json({
//       error : `Error, ${error.message}` 
//     })
//     }   
//   })
// };
