import mongoose from "mongoose";
import Category from "../models/Category.js";
import News from "../models/News.js";
import Newsletter from "../models/Newsletter.js";
import fs, { link } from 'fs'
import { log } from "console";


// add news
export const addNews = async (req, res) => {
  try {
    // Extract data from the request
    const {
      title,
      author,
      date,
      description,
      subtitle,
      subtitleDescription,
      link,
      categoryId,
      newsletterId
    } = req.body;
    const image = req.file?.path;
    // Validation , ensure all required fields are here
    if (!title || !author || !description || !categoryId || !newsletterId) {
      return res.status(400).json({ error: "Please provide all required data" });
    }
    // Fetch newsletter based on the provided ID
    const newsletter = await Newsletter.findById(newsletterId)
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
     // Fetch category based on the provided ID
     const category = await category.findById(categoryId)
     if (!category) {
       return res.status(404).json({ error: "category not found" });
     }
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }
    // Create a new news post
    const post = new News({
      title: title,
      author: author,
      description: description,
      date: date,
      subtitle: subtitle,
      subtitleDescription: subtitleDescription,
      link: link,
      image: image,
      categoryId: categoryId,
      newsletterId:newsletterId
    });
    // Save the news post and push it to the newsletter array
    const addedNews = await post.save();
    newsletter.news.push(post);
    await newsletter.save()
    // Respond with the newly created post
    return res.status(200).json({
      message: `News ${addedNews.title} is added successfuly`,
      data: addedNews
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// see all news
export const getAllNews = async (req, res) => {
  try {
    // Fetch and sort all news posts by date
    const newsCard = await News.find().sort({ date: -1 });
    if (!newsCard) {
      return res.json({
        error: "No News found"
      })
    }
    // Respond with the list of news posts
    res.status(200).json(newsCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// see a new based on id
export const getNewsById = async (req, res) => {
  const id = req.params.id;
  try {
    // Validation for he type of the news ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
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
  const id = req.body.id;
  try {
    // Validation for he type of the news ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: "News not found"
      })
    }
    // Delete the entire news post from database
    const deletedNews = await News.findOneAndDelete({ _id: id });
    if (!deletedNews) {
      return res.status(404).json({
        error: "Newscard is not found",
      });
    }
    return res
      .status(200)
      .json({ message: `News ${deletedNews.title} deleted successfully` });
  } catch (error) {
    return res.status(404).json({ message: "Error deleting newscard" });
  }
};


// update news 
export const updateNews = async (req, res) => {
  const id = req.body.id;
  // Validation for he type of the news ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "News not found"
    })
  }
  // Fetch the current news post
  const newsfirst = await News.findById(id)
  // Handle file upload and potential errors   
  try {
    // Extract updated data from the request
    const {
      author = newsfirst.author,
      title = newsfirst.title,
      date = newsfirst.date,
      description = newsfirst.description,
      subtitle = newsfirst.subtitle,
      subtitleDescription = newsfirst.subtitleDescription,
      links = newsfirst.links,
      Category = newsfirst.Category,
    } = req.body
    const image = req.file?.path;
    // Update the news post and respond with the updated data
    const news = await News.findByIdAndUpdate(
      { _id: id },
      {
        author: author,
        title: title,
        date: date,
        description: description,
        subtitle: subtitle,
        subtitleDescription: subtitleDescription,
        links: links,
        Category: Category,
        image: image
      },
      { new: true }
    )
    return res.json({
      message: `News ${newsfirst.title} is updated successfuly`,
      data: news
    })
  } catch (error) {
    return res.status(500).json({
      error: `Error, ${error.message}`
    })
  }
};


// filter by categoryID 
export const getNewsByCategory = async (req, res) => {
  const { categoryName } = req.params
  log(categoryName)
  try {
    // Find the category by name
    const category = await Category.findOne({ name: categoryName })
    console.log(category)
    if (!category) {
      return res.status(404).json({
        message: 'No category found'
      })
    }
    // Find news posts that belong to the category and respond with them
    const news = await News.find({ Category: category._id })
    return res.status(200).json(news)
  } catch (error) {
    return res.status(500).json({
      error: 'Error finding news'
    })
  }
}