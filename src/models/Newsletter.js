import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  news: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
    },
  ],
  subscribedUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscribedUser",
    },
  ],
});

export default mongoose.model("Newsletter", newsletterSchema);
