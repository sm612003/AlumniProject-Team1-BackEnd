import mongoose from "mongoose";
import Category from "../models/Category.js";
import News from "../models/News.js";
import Newsletter from "../models/Newsletter.js";
import fs from 'fs'
import { upload } from "../middlewares/multer.js";


// add news
export const addNews = async (req, res) => {
  // Handle file upload and potential errors
  upload.single("image")(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
  try {
     // Extract data from the request
    const {
      title,
      author,
      description,
      date,
      subtitle,
      subtitleDescription,
      links,
      category,
      newsletterID,
    } = req.body; 
    const image = req.file.path;
    // Validation , ensure all required fields are here
    if (!title || !author || !description || !date || !category || !newsletterID) {
      return res.status(400).json({ error: "Please provide all required data" });
    }
    // Fetch newsletter based on the provided ID
    const newsletter = await Newsletter.findById(newsletterID)
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }
      // Create a new news post
      const post = new News({
        title,
        author,
        description,
        date,
        subtitle,
        subtitleDescription,
        links,
        image,
        Category: category,
      });
      // Save the news post and push it to the newsletter array
      await post.save();
      newsletter.news.push(post);
      await newsletter.save()
      // Respond with the newly created post
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};



// see all news
export const getAllNews = async (req, res) => {
  try {
    // Fetch and sort all news posts by date
    const newsCard = await News.find().sort({ date: -1 });
    // Respond with the list of news posts
    res.status(200).json(newsCard);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// see a new based on id
export const getNewsById = async (req, res) => {
  const { id } = req.body;
  try {
    // Validation for he type of the news ID
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        error: "News not found"
      })
    }
    // Fetch the news post by ID
    const newsCard = await News.findById(id);
    if (newsCard) {
      // Respond with the news post
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
  const { id } = req.body;
  try {
    // Validation for he type of the news ID
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        error: "News not found"
      })
    }
    // Fetch the news post by ID
    const news = await News.findById(id)
    if(!news){
      return res.status(404).json({
        error: "News not found"
      })
    }
    // Delete the associated image file from the local folder 
    fs.unlink(news.image , (err) => {
      if (err){
        return res.status(500).json({
          error :`error deleting image: ${err}`
        })
      }
    })
    // Delete the entire news post from database
    const deletedNews = await News.findByIdAndRemove(id);
      if (!deletedNews) {
      res.status(404).json({
        error: "Newscard is not found",
      });
    }
    res
      .status(200)
      .json({ message: `News ${deletedNews.title} deleted successfully` });
  } catch (error) {
    res.status(404).json({ message: "Error deleting newscard" });
  }
};


// update news
export const updateNews = async (req, res) => {
  const { newsid } = req.body;
  // Validation for he type of the news ID
  if(!mongoose.Types.ObjectId.isValid(newsid)){
    return res.status(404).json({
      error: "News not found"
    })
  }
  // Fetch the current news post
  const newsfirst = await News.findById(id)
  // Delete the image from the local folder
  fs.unlink(newsfirst.image , (err)=> {
    if(err){
      return res.status(500).json({
        error: `error updating the photo`
      })
    }
  })
  // Handle file upload and potential errors
  upload.single('image')(req, res, async function (err){
    if (err) {
      return res.status(400).json({ error: err.message });
    }    
    try {
      // Extract updated data from the request
      const updatedData = req.body 
      const image = req.file.path ;
      updatedData.image = image ;
      // Update the news post and respond with the updated data
      const news = await News.findByIdAndUpdate(
        {_id: id},
        updatedData,
        {new: true}
      )
      return res.json(news)   
    } catch (error){
    return res.status(500).json({
      error : `Error, ${error.message}` 
    })
    }   
  })
};


// filter by categoryID 
export const getNewsByCategory = async (req , res) => {
  const categoryName = req.params.name
  try {
    // Find the category by name
    const category = await Category.findOne({name : categoryName})
    console.log(category)
    if(!category){
      return res.status(404).json({
        message:  'No category found'
      })
    }
    // Find news posts that belong to the category and respond with them
    const news = await News.find({ Category : category._id})
    return res.status(200).json(news) 
  } catch (error){
    return res.status(500).json({
      error : 'Error finding news'
    })
  }
}