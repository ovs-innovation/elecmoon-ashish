const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

const addComment = async (req, res) => {
  try {
    const { blogId, name, email, website, comment } = req.body;

    // Validate required fields
    if (!blogId || !name || !email || !comment) {
      return res.status(400).send({
        message: "Name, email, and comment are required fields.",
      });
    }

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
      });
    }

    const newComment = new Comment({
      blogId,
      name,
      email,
      website: website || "",
      comment,
      status: "approved", // Auto-approve comments, can be changed to "pending" for moderation
    });

    await newComment.save();
    res.send({ message: "Comment added successfully!", comment: newComment });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId, status: "approved" })
      .sort({ createdAt: -1 })
      .select("-__v");
    res.send(comments);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("blogId", "title slug")
      .sort({ createdAt: -1 });
    res.send(comments);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "pending", "rejected"].includes(status)) {
      return res.status(400).send({
        message: "Invalid status. Must be approved, pending, or rejected.",
      });
    }

    const comment = await Comment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }

    res.send({ message: "Comment status updated successfully!", comment });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).send({
        message: "Comment not found",
      });
    }

    res.send({ message: "Comment deleted successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addComment,
  getCommentsByBlogId,
  getAllComments,
  updateCommentStatus,
  deleteComment,
};

