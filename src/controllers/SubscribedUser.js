// Import necessary modules
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new subscribed user
export const createSubscribedUser = async (req, res) => {
  try {
    const { email, NewsLetterId } = req.body;

    if (!email || !NewsLetterId) {
      return res.status(400).json({ error: 'Please provide all required data' });
    }

    const newSubscribedUser = await prisma.SubscribedUser.create({
      data: {
        email,
        NewsLetterId,
      },
    });

    return res.status(201).json({
      message: `Subscribed user with email ${newSubscribedUser.email} created successfully`,
      data: newSubscribedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all subscribed users
export const getAllSubscribedUsers = async (req, res) => {
  try {
    const subscribedUsers = await prisma.SubscribedUser.findMany();
    
    if (!subscribedUsers.length) {
      return res.json({
        error: 'No subscribed users found',
      });
    }

    res.status(200).json(subscribedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get subscribed user by ID
export const getSubscribedUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const subscribedUser = await prisma.SubscribedUser.findUnique({
      where: { id: parseInt(id) },
    });

    if (subscribedUser) {
      return res.status(200).json(subscribedUser);
    } else {
      return res.status(404).json({ message: 'Subscribed user not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete subscribed user by ID
export const deleteSubscribedUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const subscribedUser = await prisma.SubscribedUser.findUnique({
      where: { id },
    });

    if (!subscribedUser) {
      return res.status(404).json({
        error: 'Subscribed user not found',
      });
    }

    await prisma.SubscribedUser.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Subscribed user deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update subscribed user by ID
// export const updateSubscribedUser = async (req, res) => {
//   const id = parseInt(req.params.id);

//   try {
//     const updatedSubscribedUser = await prisma.SubscribedUser.update({
//       where: { id },
//       data: {
//         email: req.body.email,
//         NewsLetterId: req.body.NewsLetterId,
//       },
//     });

//     return res.status(200).json({
//       message: 'Subscribed user updated successfully',
//       data: updatedSubscribedUser,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
