import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
    validate: {
      validator: (date) => !isNaN(date),
      message: "Date must be a valid date.",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Accountant"],
    required: true,
  },
});

// Hash the password before saving to the database
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isNew) {
//     try {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(this.password, salt);
//       this.password = hashedPassword;
//       next();
//     } catch (error) {
//       return next(error);
//     }
//   } else {
//     return next();
//   }
// });

const User = mongoose.model("User", userSchema);

export default User;
