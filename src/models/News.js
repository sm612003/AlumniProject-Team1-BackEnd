import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String, //file Path
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  subtitleDescrption: {
    type: String,
    required: false,
  },
  links: {
    type: String,
    required: false,
  },
  categoryID: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("News", newsSchema);
