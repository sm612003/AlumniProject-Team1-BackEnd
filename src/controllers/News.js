import fs, { link } from 'fs'
import { log } from "console";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


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
    console.log(image)
        // Validation , ensure all required fields are here
    if (!title || !author || !description || !categoryId || !newsletterId) {
      return res.status(400).json({ error: "Please provide all required data" });
    }
    // Fetch newsletter based on the provided ID
    const newsletter = await prisma.Newsletter.findUnique({
      where: {
       id: parseInt(newsletterId),
      },
    })
    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
     // Fetch category based on the provided ID
     const category = await prisma.Category.findUnique({
      where: {
       id: parseInt(categoryId),
      },
    })
     if (!category) {
       return res.status(404).json({ error: "category not found" });
     }
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }
   
   
//create news
    const addedNews = await prisma.News.create({
      data: {
          title: title,
          author: author,
          description: description,
          date: new Date(date),
          subtitle: subtitle,
          subtitleDescription: subtitleDescription,
          link: link,
          categoryId: parseInt(categoryId),
           image: image,
          newsletterId:parseInt(newsletterId)
        },
    })
    
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
    const newsCard = await prisma.News.findMany({
      orderBy: [
        {
          date: 'asc',
        },
      ]
    })
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
  const id = req.body.id;
  try {
  
    // Fetch the news post by ID
    const newsCard = await prisma.News.findUnique({
      where: {
       id: parseInt(id),
      },
    })
    if (newsCard) {
      // Respond with the news post
      res.status(200).json(newsCard);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// delete a news based on id
export const deleteNews = async (req, res) => {
  const id = req.body.id;
  try {console.log(id)
    // Delete the entire news post from database
    const deletedNews = await prisma.News.delete({
      where: {
        id: parseInt(id),
      },
    })
    
    if (!deletedNews) {
      return res.status(404).json({
        error: "Newscard is not found",
      });
    }
    console.log(deletedNews)
    return res.status(200).json({ message: `News ${deletedNews.title} deleted successfully` });
  } catch (error) {
    return res.status(404).json({ message: "Error deleting newscard" });
  }
};


// update news 
export const updateNews = async (req, res) => {
  const id = req.body.id;
  // Fetch the current news post
  const newsfirst = await prisma.News.findUnique({
    where: {
     id: parseInt(id),
    },
  })

  if (!newsfirst) {
    return res.status(404).json({
      error: "News is not found",
    });
  }
  // // Handle file upload and potential errors   
  try {
    // Extract updated data from the request
    const {
      author = newsfirst.author,
      title = newsfirst.title,
      date = newsfirst.date,
      description = newsfirst.description,
      subtitle = newsfirst.subtitle,
      subtitleDescription = newsfirst.subtitleDescription,
      link = newsfirst.link,
      categoryId = newsfirst.categoryId,
      newsletterId=newsfirst.newsletterId
    } = req.body
    const image = req.file?.path;
    // Update the news post and respond with the updated data

    const updatedNews = await prisma.News.update({
      data: {
        author: author,
        title: title,
        date: date,
        description: description,
        subtitle: subtitle,
        subtitleDescription: subtitleDescription,
        link: link,
        categoryId: categoryId,
        newsletterId:newsletterId,
        image: image
      },
      where: {
        id: parseInt(id),
      },
    })
  
    return res.json({
      message: `News ${updatedNews.title} is updated successfuly`,
      data: updatedNews
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
    const category = await prisma.Category.findFirst({
      where: {
       name:categoryName
      },
    })
    console.log(category)
    if (!category) {
      return res.status(404).json({
        message: 'No category found'
      })
    }
    // Find news posts that belong to the category and respond with them
    const news = await prisma.News.findMany({where:{ categoryId: category.id }})
    return res.status(200).json(news)
  } catch (error) {
    return res.status(500).json({
      error: 'Error finding news'
    })
  }
}