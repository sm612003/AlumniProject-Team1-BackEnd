import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.split(' ').length >= 1,
      message: "This field must contain at least one word.",
    },
  },
  author: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.split(' ').length >= 1,
      message: "This field must contain at least one word.",
    },
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: (date) => !isNaN(date), // Check if it's a valid date
      message: "Date must be a valid date.",
    },
  },
  image: {
    type: String, //file Path
    required: false,
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.split(' ').length >= 10,
      message: "This field must contain at least 10 words.",
    },
  },
  subtitle: {
    type: String,
    required: false,
    validate: {
      validator: (value) => value.split(' ').length >= 3,
      message: "This field must contain at least 3 words.",
    },
  },
  subtitleDescrption: {
    type: String,
    required: false,
    validate: {
      validator: (value) => value.split(' ').length >= 10,
      message: "This field must contain at least 10 words.",
    },
  },
  links: {
    type: String,
    required: false,
  },
  Category: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required : true
  },
});

export default mongoose.model("News", newsSchema);
