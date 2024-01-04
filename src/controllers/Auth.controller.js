import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const google = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (user) {
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
      );
      console.log("Generated Token:", token);

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ user: { ...user, password: undefined }, token });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const generatedName =
        req.body.firstName.toLowerCase() +
        req.body.lastName.toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = await prisma.user.create({
        data: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          description: req.body.description,
          // dob: new Date(req.body.dob),
          link: req.body.link,
          image: req.body.image,
        },
      });

      const token = jwt.sign(
        { id: newUser.id, role: newUser.role },
        process.env.JWT_SECRET
      );
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ user: { ...newUser, password: undefined }, token });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
