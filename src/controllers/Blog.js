import Blog from "../models/Blog.js";
import multer from "multer";
import path from "path";

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

    const { full_name, title, content, categoryID } = req.body;
    const image = req.file.path;

    try {
      const blog = new Blog({
        full_name,
        title,
        content,
        image,
        categoryID,
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

// export const findByCategory= async (req, res) => {
//   const { ID } = req.params;

//   try {
//     const posts = await PostMessage.find({ categoryID: ID });
//     if (posts.length > 0) {
//       res.status(200).json(posts);
//     } else {
//       res.status(404).json({ message: 'No blog posts found in the specified category' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
