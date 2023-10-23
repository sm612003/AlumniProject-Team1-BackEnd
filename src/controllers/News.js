import News from "../models/News.js";
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

// add news
export const addNews = async (req, res) => {
  upload.single("image")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const {
      title,
      author,
      description,
      date,
      subtitle,
      subtitleDescription,
      links,
      categoryID,
    } = req.body;
    const image = req.file.path;

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    try {
      const post = new News({
        title,
        author,
        description,
        date,
        subtitle,
        subtitleDescription,
        links,
        image,
        categoryID,
      });
      const newsCard = await post.save();
      res.status(200).json(newsCard);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });
};


// see all news
export const getAllNews = async (req, res) => {
  try {
    const newsCard = await News.find().sort({ date: -1 });
    res.status(200).json(newsCard);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// see a new based on id
export const getNewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const newsCard = await News.findById(id);
    if (newsCard) {
      res.status(200).json(newsCard);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// delete a news based on id
export const deleteNews = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNews = await News.findByIdAndRemove(id);
    if (!deletedNews) {
      res.status(404).json({
        error: "Newscard is not found",
      });
    }
    res
      .status(200)
      .json({ message: `News ${deletedNews} deleted successfully` });
  } catch (error) {
    res.status(404).json({ message: "Error deleting newscard" });
  }
};


// update news
export const updateNews = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  if (req.file) {
    // Handle photo upload if a new photo is provided
    updateData.photo = req.file.filename;
    updateData.photoUrl = photoUrl;
  }
  try {
    const updatedNews = await News.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedNews) {
      res.status(404).json({ error: "News card not found" });
      return;
    }
    res.json({
      message: "News card updated successfully",
      data: updatedNews,
    });
  } catch (error) {
    console.error("Error updating news card:", error);
    res.status(500).json({
      error: "Error updating news card",
    });
  }
};

// filter by categoryID 
export const getNewsByCategory = async (req , res) => {
  const {categoryID} = req.params 
  try {
    const newsInCategory = await News.find({categoryID})

    if(newsInCategory.length === 0){
      res.status(404).json({
        message:  'No news found for this category'
      })
    }

    res.status(200).json(newsInCategory) 
  } catch (error){
    res.status(500).json({
      error : 'Error finding news'
    })
  }
}