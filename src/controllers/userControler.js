// import { comparePassword, generateToken } from "../utils/jwt.js";
// import User from "../models/User.js";
// // export const createUser = async (req, res) => {
// //   const { firstName, lastName, dob, email, password, role } = req.body;
// //   const image = req.file?.path;

// //   const hashedPassword = await hashPassword(password);

// //   if (!firstName || !lastName || !dob || !email || !password || !role) {
// //     return res.status(400).send("All fields are required!");
// //   }

// //   if (!req.file) {
// //     return res.status(400).json({ error: "Please upload an image" });
// //   }

// //   try {
// //     const newUser = await User.create({
// //       firstName,
// //       lastName,
// //       dob,
// //       email,
// //       password: hashedPassword,
// //       image,
// //       role,
// //     });

// //     if (newUser) {
// //       return res.status(200).json({
// //         message: `New User ${firstName} ${lastName} has been created successfully!`,
// //         User: newUser,
// //       });
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).send("Internal Server Error");
// //   }
// // };
// import { hashPassword } from "../utils/jwt.js";

// export const createUser = async (req, res) => {
//   const { firstName, lastName, dob, email, password, role } = req.body;
//   const image = req.file?.path;

//   if (!firstName || !lastName || !dob || !email || !password || !role) {
//     return res.status(400).send("All fields are required!");
//   }

//   if (!req.file) {
//     return res.status(400).json({ error: "Please upload an image" });
//   }

//   try {
//     const hashedPassword = await hashPassword(password);

//     const newUser = await User.create({
//       firstName,
//       lastName,
//       dob,
//       email,
//       password: hashedPassword,
//       image,
//       role,

//     });

//     if (newUser) {
//       return res.status(200).json({
//         message: `New User ${firstName} ${lastName} has been created successfully!`,
//         User: newUser,

//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal Server Error");
//   }
// };
// export const showAllUsers = async (req, res) => {
//   const { page = 1, pageSize = 10 } = req.query;
//   const offset = (page - 1) * pageSize;

//   try {
//     const users = await User.find().skip(offset).limit(parseInt(pageSize));
//     return res.status(200).json({ Users: users });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const showOneUser = async (req, res) => {
//   const id = req.params._id;

//   try {
//     const user = await User.findById(id);

//     if (user) {
//       return res.status(200).json({ User: user });
//     } else {
//       return res.status(404).send(`User ${id} does not exist!`);
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// /// is not working when i add image , err in multer
// export const updateUser = async (req, res) => {
//   const id = req.body.id;
//   const { firstName, lastName,
//     //  dob, email, password, role
//      } = req.body;
//   const newImage = req.file?.path;

//   if (!firstName || !lastName
//     //  !dob || !email || !password || !role
//      ) {
//     return res.status(400).send("All fields are required!");
//   }

//   try {
//     const user = await User.findById(id);
//     const oldImage = user.image;

//     if (!user) {
//       return res.status(404).send(`User ${id} does not exist!`);
//     }

//     const editUser = await User.findByIdAndUpdate(
//       { _id: id },
//       {
//         firstName,
//         lastName,
//         // dob,
//         // email,
//         // password,
//         // image: newImage,
//         // role,
//       },
//       { new: true }
//     );

//     if (req.file) {
//       // Delete old image
//       // You need to implement the logic to delete the old image from your storage
//     }

//     return res.status(200).json({
//       message: `User ${editUser.firstName} has been updated successfully!`,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const deleteUser = async (req, res) => {
//   const id = req.body.id;

//   try {
//     const user = await User.findOneAndDelete({ _id: id });

//     if (!user) {
//       return res.status(404).send(`User ${id} does not exist!`);
//     }

//     // await user.remove();
//     return res
//       .status(200)
//       .json({ message: `User ${id} has been deleted successfully!` });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(401).json({ err: "Invalid email or password" });
//     }

//     const isPasswordValid = await comparePassword(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ err: "Invalid password" });
//     }

//     const token = generateToken(user);

//     return res
//       .cookie("token", token, { httpOnly: true, sameSite: "Strict" })
//       .json({ message: "Login successful" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const loggedInUser = (req, res) => {
//   res.json({ user: req.user });
// };

// export const logout = async (req, res) => {
//   // Add your logic for logging out here
//   // For example, clearing the token from cookies
//   res.clearCookie("token").json({ message: "Logout successful" });
// };

import { hashPassword } from "../utils/jwt.js";
import { PrismaClient } from "@prisma/client";
import { comparePassword, generateToken } from "../utils/jwt.js";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { firstName, lastName, dob, email, password, role, Link, description } =
    req.body;
  const image = req.file?.path;

  if (
    !firstName ||
    !lastName ||
    !dob ||
    !email ||
    !password ||
    !role ||
    !description ||
    !Link
  ) {
    return res.status(400).send("All fields are required!");
  }

  if (!req.file) {
    return res.status(400).json({ error: "Please upload an image" });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.User.create({
      data: {
        firstName,
        lastName,
        dob: new Date(dob),
        email,
        password: hashedPassword,
        image,
        role,
        description,
        Link,
      },
    });

    if (newUser) {
      return res.status(200).json({
        message: `New User ${firstName} ${lastName} has been created successfully!`,
        User: newUser,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const showAllUsers = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const users = await prisma.user.findMany({
      skip: offset,
      take: parseInt(pageSize),
    });

    return res.status(200).json({ Users: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const showOneUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      return res.status(200).json({ User: user });
    } else {
      return res.status(404).send(`User ${id} does not exist!`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.body.id);
  const { firstName, lastName, description, password, Link } = req.body;
  const newImage = req.file?.path;

  if (!firstName || !lastName) {
    return res.status(400).send("First name and last name are required fields!");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).send(`User ${id} does not exist!`);
    }

    let hashedPassword = user.password; // Retain the existing password by default

    // Check if a new password is provided
    if (password) {
      // Hash the new password
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const editUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        description,
        image: newImage,
        password: hashedPassword,
        Link,
      },
    });

    if (req.file) {
      // Delete old image
      // You need to implement the logic to delete the old image from your storage
    }

    return res.status(200).json({
      message: `User ${editUser.firstName} has been updated successfully!`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteUser = async (req, res) => {
  const id = parseInt(req.body.id);

  try {
    const user = await prisma.user.delete({
      where: { id },
    });

    if (!user) {
      return res.status(404).send(`User ${id} does not exist!`);
    }

    return res
      .status(200)
      .json({ message: `User ${id} has been deleted successfully!` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ err: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ err: "Invalid password" });
    }

    const token = generateToken(user);
    return res
      .cookie("token", token, { httpOnly: true, sameSite: "Strict" })
      .json(user); // pass data of user to frontend
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const loggedInUser = (req, res) => {
  res.json("loged from user controller"+{ user: req.user });
  console.log("loged from auth" )
};

export const logout = async (req, res) => {
  // Add your logic for logging out here
  // For example, clearing the token from cookies
  res.clearCookie("token").json({ message: "Logout successful" });
};

//
export const BarChart = async (req, res) => {
  try {
    // Fetch the number of subscribed users
    const subscribedUserCount = await prisma.subscribedUser.count();

    // Fetch the number of regular users
    const userCount = await prisma.user.count();

    res.json({
      subscribedUserCount,
      userCount,
    });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// get most active user that add blog 

export const getMostActiveUsers = async (req, res) => {
  try {
    const mostActiveUsers = await prisma.user.findMany({
      orderBy: {
        blogs: {
          _count: 'desc',
        },
      },
      take: 5,
      include: {
        blogs: true, // Include the blogs relationship
      },
    });

    res.json(mostActiveUsers);
  } catch (error) {
    console.error('Error fetching most active users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getUserDescriptions = async (req, res) => {
  try {
    const usersWithDescriptions = await prisma.user.findMany({
      select: {
        description: true,
      },
    });

    const descriptions = usersWithDescriptions.map(user => user.description || 'No Description');

    res.json(descriptions);
  } catch (error) {
    console.error('Error fetching user descriptions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};