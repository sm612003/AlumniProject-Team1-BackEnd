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
      unique: true 
    },
  ],
});

export default mongoose.model("Newsletter", newsletterSchema);
