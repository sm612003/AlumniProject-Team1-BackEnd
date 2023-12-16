import express from "express";
import {
  createUser,
  showAllUsers,
  showOneUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userControler.js";
import { upload } from "../middlewares/multer.js";
import { authenticateUser, authorizeUser , loggedInUser } from "../middlewares/auth.js";
import User from '../models/User.js';  // Adjust this import

const userRoutes = express.Router();

// Create a user
userRoutes.post("/create", upload.single("image"), createUser);

// Show all users
userRoutes.get(
  "/view-all",
  authenticateUser,
  authorizeUser(["Admin"]),
  showAllUsers
);

// Show one user
userRoutes.get("/view-one/:id", showOneUser);

// Update a user
userRoutes.patch("/update", upload.single("image"), updateUser);

// Delete a user
userRoutes.delete("/delete", deleteUser);

// Login user
userRoutes.post("/login", loginUser , loggedInUser);

export default userRoutes;
