const Blog = require("../models/Blog");

const addBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.send({ message: "Blog Added Successfully!", blog: newBlog });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.send(blogs);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "show" }).sort({ publishedAt: -1, createdAt: -1 });
    res.send(blogs);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
      });
    }
    res.send(blog);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: "show" });
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
      });
    }
    res.send(blog);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
      });
    }
    res.send({
      message: "Blog updated successfully!",
      blog,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
      });
    }
    res.send({
      message: "Blog status updated successfully!",
      blog,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
      });
    }
    res.send({
      message: "Blog deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addBlog,
  getAllBlogs,
  getShowingBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  updateStatus,
  deleteBlog,
};

