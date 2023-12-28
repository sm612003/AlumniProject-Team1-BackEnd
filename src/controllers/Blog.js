// import mongoose from "mongoose";
// import Blog from "../models/Blog.js";
// import Category from "../models/Category.js";
// import fs from "fs"


// //add blog
// export const addBlog = async (req, res) => {
//   try {
//     const { 
//       author, 
//       title, 
//       content, 
//       category 
//     } = req.body;
//     const image = req.file.path;

//     if(!author || !title || !content ){
//       return res.json({
//         error: "Please provide all required data"
//       })
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: "Please upload an image" });
//     }
//       const blog = new Blog({
//         author,
//         title,
//         content,
//         image,
//         category: category,
//       });
//       const newBlog = await blog.save();
//       return res.status(200).json({
//         message : `Blog ${newBlog.title} is added successfuly`,
//         data : newBlog
//       });
//     } catch (error) {
//       return res.status(500).json({
//          message: error.message 
//         });
//     }
//   } ;
  
// //get the blogs
// export const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     if(!blogs){
//       return res.json({
//         error : "No blogs found"
//       })
//     }
//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //get blog by id

// export const getBlogById = async (req, res) => {
//   const  {id}  = req.params;
//   try {  
//         // Validation for he type of the blog id 
//         if(!mongoose.Types.ObjectId.isValid(id)){
//           return res.status(404).json({
//             error: "News not found"
//           })
//         }

//     const blog = await Blog.findById(id);
//     if (blog) {
//       return res.status(200).json(blog);
//     } else {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// //delete blog by id
// export const deleteBlog = async (req, res) => {
//   const id = req.body.id;
//   try {
//     if(!mongoose.Types.ObjectId.isValid(id)){
//       return res.status(404).json({
//         error: "Blogs not found"
//       })
//     }
//     const blogg = await Blog.findById(id);
//     if(!blogg){
//       return res.status(404).json({
//         error: "Blogs not found"
//       })
//     }

//     fs.unlink(blogg.image , (err) => {
//       if (err){
//         return res.status(500).json({
//           error :`error deleting image: ${err}`
//         })
//       }
//     })

//     const deletedBlogs = await Blog.findByIdAndRemove(id)
//     if (!deletedBlogs) {
//       return res.status(404).json({
//         error: "Blog is not found",
//       });
//     }
//     return res.status(200).json({ message: "Blog post deleted successfully" });
//   } catch (error) {
//     return res
//       .status(404)
//       .json({ message: "Blog post not found or could not be deleted" });
//   }
// };

// //update the blog by id 
// export const updateBlog = async (req, res) => {
//   const  id  = req.body.id;
//   // const { author, title, content, category } = req.body;
//   if(!mongoose.Types.ObjectId.isValid(id)){
//     return res.status(404).json({
//       error: "Blogs not found"
//     })
//   }
//   const blogfirst = await Blog.findById(id)
//   try {
//     const {
//       author = blogfirst.author, 
//       title = blogfirst.title, 
//       content = blogfirst.content , 
//     } = req.body
//     const image = req.file?.path ;
//       // Find the existing blog post by ID
//       const updatedBlog = await Blog.findByIdAndUpdate(
//         { _id: id },
//         {author: author ,
//         title: title ,
//         content: content , 
//         image: image} ,
//         { new: true }
//       );


//       return res.status(200).json({ message: 'Blog updated successfully', data: updatedBlog });
//     } catch (error) {
//       return res.status(400).json({ message: error.message });
//     }
//   }

// //filter by category
 
// export const getBlogsByCategory= async (req,res)=>{
//   const categoryName = req.body.categoryName;
//   try{
//     const category = await Category.findOne({name: categoryName})
//     console.log(category)
//     if (!category){
//       return res.status(404).json({
//         message:"category not found"
//       })
//     }
//     const blogs= await Blog.find({ category: category._id});
//     res.status(201).json(blogs);
//   }catch(error){
//      res.status(500).json({error:error.message})
//   } 
// }

// prismaBlogController.js
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
// Add Blog
export const addBlog = async (req, res) => {
  try {
    const { author, title, content } = req.body;
    const image = req.file.path;
     const userId = req.user?.id;

    if (!author || !title || !content) {
      return res.json({
        error: 'Please provide all required data',
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    const newBlog = await prisma.blog.create({
      data: {
        author,
        title,
        content,
        image,
        user: {
          connect: { id: userId }, // Connect to an existing user because we havev relation in betweein blog and user 
        },
      },
    });

    return res.status(200).json({
      message: `Blog ${newBlog.title} is added successfully`,
      data: newBlog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      
    });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
    if (!blogs.length) {
      return res.json({
        error: 'No blogs found',
      });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blog by id
export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id:parseInt(id )},
    });
    if (blog) {
      return res.status(200).json(blog);
    } else {
      return res.status(404).json(`User ${id} does not exist!`);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete blog by id
export const deleteBlog = async (req, res) => {
  const id = parseInt(req.params.id); // Change to req.params.id

  try {
    const blog = await prisma.Blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return res.status(404).json({
        error: 'Blog not found',
      });
    }

    await prisma.Blog.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ message: 'Internal server error' });
  }
};



// Update blog by id
// Update blog by id
export const updateBlog = async (req, res) => {
  const id = parseInt(req.body.id);
  try {
    const existingBlog = await prisma.Blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return res.status(404).json({
        error: 'Blog not found',
      });
    }

    const updatedFields = {};

    // Update author if provided
    if (req.body.author) {
      updatedFields.author = req.body.author;
    }

    // Update title if provided
    if (req.body.title) {
      updatedFields.title = req.body.title;
    }

    // Update content if provided
    if (req.body.content) {
      updatedFields.content = req.body.content;
    }

    // Update image if file is provided
    if (req.file) {
      updatedFields.image = req.file.path;
    }

    const updatedBlog = await prisma.Blog.update({
      where: { id },
      data: updatedFields,
    });

    return res.status(200).json({ message: 'Blog updated successfully', data: updatedBlog });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// // Filter by category
// export const getBlogsByCategory = async (req, res) => {
//   const categoryName = req.body.categoryName;
//   try {
//     const category = await prisma.category.findUnique({
//       where: { name: categoryName },
//     });

//     if (!category) {
//       return res.status(404).json({
//         message: 'Category not found',
//       });
//     }

//     const blogs = await prisma.blog.findMany({
//       where: { categoryId: category.id },
//     });

//     res.status(201).json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
