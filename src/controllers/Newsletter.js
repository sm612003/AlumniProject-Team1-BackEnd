

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add a new newsletter
export const addNewsletter = async (req, res) => {
  const { name } = req.body;

  try {
    // Create a new newsletter in the database using Prisma
    const newNewsletter = await prisma.Newsletter.create({
      data: {
        name,
      },
    });

    // Respond with the newly added newsletter
    res.status(200).json(newNewsletter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding newsletter" });
  }
};
