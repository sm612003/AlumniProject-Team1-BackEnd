// import Newsletter from "../models/Newsletter.js";
// import mongoose from "mongoose";

// // Get all newsletters
// export const getAllNewsletters = async (req, res) => {
//   try {
//     // Retrieve all newsletters from the database
//     const newsletter = await Newsletter.find();
//     // Respond with the list of newsletters
//     res.status(200).json(newsletter);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getNewsletterById = async (req, res) => {
//   const { id } = res.body;
//   try {
//     // Validate and fetch a newsletter by its ID
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({
//           error: "News not found"
//         })
//       }
//     const newsletter = await Newsletter.findById(id);
//     // Respond with the retrieved newsletter
//     res.status(200).json(newsletter);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };


// // Add a new newsletter
// export const addNewsletter = async (req, res) => {
//   const name = req.body.name;
//   try {
//     // Create a new newsletter instance
//     const newNewsletter = new Newsletter({ name });
//     // Save the new newsletter to the database
//     await newNewsletter.save();
//     // Respond with the newly added newsletter
//     res.status(200).json(newNewsletter);
//   } catch (error) {
//     res.status(500).json({ error: "error adding newsletter" });
//     console.log(error);
//   }
// };


// // Delete a newsletter by ID
// export const deleteNewsletterById = async (req, res) => {
//   const id = req.body.id ;
//   try {
//     // Validation for he type of the news ID
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({
//           error: "News not found"
//         })
//       }
//     // Attempt to delete a newsletter by its ID
//     const deletedNewsletter = await Newsletter.findByIdAndDelete(id);
//     if (!deletedNewsletter) {
//       // If the newsletter is not found, send an error response
//       return res.status(404).json({ message: "Newsletter not found" });
//     }
//     // Respond with a success message if the newsletter is deleted
//     res.status(200).json({ message: `Newsletter deleted successfully` });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };


// // Update newsletter emails by pushing a new email to the array
// export const updateNewsletterEmails = async (req, res) => {
//     const { id , email } = req.body;
//     try {
//       // Validate the newsletter ID
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({
//           error: "Newsletter not found"
//         });
//       }
//       // Find the newsletter by its ID
//       const newsletter = await Newsletter.findById(id);
//       if (!newsletter) {
//         return res.status(404).json({
//           error: "Newsletter not found"
//         });
//       }
//       // Check for duplicate email
//       if (newsletter.subscribedUser.includes(email)) {
//         return res.status(400).json({
//           error: "Email already subscribed"
//         });
//       }
//       // Push the new email into the subscribedUser array
//       newsletter.subscribedUser.push(email);
//       // Save the updated newsletter with the new email
//       await newsletter.save();
//       // Respond with the updated newsletter
//       res.status(200).json({
//         message: "Email added to newsletter successfully",
//         newsletter
//       });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all newsletters
export const getAllNewsletters = async (req, res) => {
  try {
    // Retrieve all newsletters from the database
    const newsletters = await prisma.newsletter.findMany();
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
    const newsletter = await prisma.newsletter.findUnique({
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
    const newNewsletter = await prisma.newsletter.create({
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
    const deletedNewsletter = await prisma.newsletter.delete({
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

// Update newsletter emails by pushing a new email to the array
// export const updateNewsletterEmails = async (req, res) => {
//   const { id, email } = req.body;
//   try {
//     // Validate the newsletter ID
//     const newsletter = await prisma.newsletter.findUnique({
//       where: { id: parseInt(id) },
//     });

//     if (!newsletter) {
//       return res.status(404).json({ error: "Newsletter not found" });
//     }

//     // Check for duplicate email
//     if (newsletter.subscribedUser.includes(email)) {
//       return res.status(400).json({ error: "Email already subscribed" });
//     }

//     // Push the new email into the subscribedUser array
//     await prisma.newsletter.update({
//       where: { id: parseInt(id) },
//       data: {
//         subscribedUser: {
//           push: email,
//         },
//       },
//     });

//     // Respond with the updated newsletter
//     res.status(200).json({
//       message: "Email added to newsletter successfully",
//       newsletter,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Error updating newsletter emails" });
//     console.error(error);
//   }
// };
