
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all newsletters
export const getAllNewsletters = async (req, res) => {
  try {
    // Retrieve all newsletters from the database
    const newsletters = await prisma.Newsletter.findMany();
    // Respond with the list of newsletters
    res.status(200).json(newsletters);
  } catch (error) {
    res.status(500).json({ error: "Error fetching newsletters" });
    console.error(error);
  }
};

export const getNewsletterById = async (req, res) => {
  const { id } = req.body;
  try {
    // Validate and fetch a newsletter by its ID
    const newsletter = await prisma.Newsletter.findUnique({
      where: { id: parseInt(id) },
    });

    if (!newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }

    // Respond with the retrieved newsletter
    res.status(200).json(newsletter);
  } catch (error) {
    res.status(500).json({ error: "Error fetching newsletter" });
    console.error(error);
  }
};

// Add a new newsletter
export const addNewsletter = async (req, res) => {
  const name = req.body.name;
  try {
    // Create a new newsletter instance
    const newNewsletter = await prisma.Newsletter.create({
      data: { name },
    });
    // Respond with the newly added newsletter
    res.status(200).json(newNewsletter);
  } catch (error) {
    res.status(500).json({ error: "Error adding newsletter" });
    console.error(error);
  }
};

// Delete a newsletter by ID
export const deleteNewsletterById = async (req, res) => {
  const { id } = req.body;
  try {
    // Attempt to delete a newsletter by its ID
    const deletedNewsletter = await prisma.Newsletter.delete({
      where: { id: parseInt(id) },
    });

    if (!deletedNewsletter) {
      // If the newsletter is not found, send an error response
      return res.status(404).json({ message: "Newsletter not found" });
    }

    // Respond with a success message if the newsletter is deleted
    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting newsletter" });
    console.error(error);
  }
};

export const updateNewsLetter = async (req, res) => {
  const id = parseInt(req.body.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("All fields are required!");
  }

  try {
    const newsLetter = await prisma.Newsletter.findUnique({
      where: { id },
    });

    if (!newsLetter) {
      return res.status(404).send(`NewsLetter ${id} does not exist!`);
    }

    const editNewsletter = await prisma.Newsletter.update({
      where: { id },
      data: {
        name,
      },
    });

    return res.status(200).json({
      message: `newsLetter ${editNewsletter.name} has been updated successfully!`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
