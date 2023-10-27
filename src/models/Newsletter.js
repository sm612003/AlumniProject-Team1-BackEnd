import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (name) => name.length >= 3, // For example, require at least 3 characters
      message: "Name must be at least 3 characters long.",
    },
  },
  news: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
    },
  ],
  subscribedUser: [
    {
      type: String,
      unique: true,
      validate: {
        validator: (email) => {
          // Use a regular expression to validate email format
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(email);
        },
        message: "Invalid email format",
      },
    },
  ],
});

export default mongoose.model("Newsletter", newsletterSchema);
