import Blog from "../models/Blog.js";
import multer from "multer";
import path from "path";
import fs from 'fs'
import exp from "constants";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "image-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

export const addBlog = async (req, res) => {
  upload.single("image")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { author, title, content, categoryName } = req.body;
    const image = req.file.path;

    try {
      const blog = new Blog({
        author,
        title,
        content,
        image,
        categoryName,
      });
      const newBlog = await blog.save();
      res.status(200).json(newBlog);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    await Blog.findByIdAndRemove(id);
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Blog post not found or could not be deleted" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
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





export const findBlogByCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    const blogsCategory = await Blog.find({ categoryName })
    if (blogsCategory) {
      res.status(200).json(blogsCategory)
    } else {
      res.status(404).json({ message: "No blogs found" })
    }
  } catch (error) {
    res.json(400).json({ message: error.message })
  }
}






export const updateBlog = async (req, res) => {
  const { id } = req.params;
  upload.single("image")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // const { author, title, content, categoryName } = req.body;

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
