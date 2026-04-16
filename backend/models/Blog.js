const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: Object,
      required: true,
    },
    description: {
      type: Object,
      required: false,
    },
    content: {
      type: Object,
      required: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    tags: [String],
    status: {
      type: String,
      default: "show",
      enum: ["show", "hide"],
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;

