
import { hashPassword } from "../utils/jwt.js";
import { PrismaClient } from "@prisma/client";
import { comparePassword, generateToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { firstName, lastName, dob, email, password, role, Link, description } =
    req.body;
  const image = req.file?.path;

  if (!firstName || !lastName || !dob || !email || !password || !role || !  description || !Link) {
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
  const id = parseInt(req.params._id);

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
  const { firstName, lastName, description } = req.body;
  const newImage = req.file?.path;

  if (!firstName || !lastName) {
    return res.status(400).send("All fields are required!");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).send(`User ${id} does not exist!`);
    }

    const editUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        description,
        image: newImage,

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
    const user = await prisma.User.findUnique({
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
      .json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const loggedInUser = (req, res) => {
  res.json({ user: req.user });
};

export const logout = async (req, res) => {
  // Add your logic for logging out here
  // For example, clearing the token from cookies
  res.clearCookie("token").json({ message: "Logout successful" });
};