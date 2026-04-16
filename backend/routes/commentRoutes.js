const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByBlogId,
  getAllComments,
  updateCommentStatus,
  deleteComment,
} = require("../controller/commentController");
const { isAuth, isAdmin } = require("../config/auth");

// Public routes
router.post("/add", addComment);
router.get("/blog/:blogId", getCommentsByBlogId);

// Admin routes
router.get("/", isAuth, isAdmin, getAllComments);
router.put("/status/:id", isAuth, isAdmin, updateCommentStatus);
router.delete("/:id", isAuth, isAdmin, deleteComment);

module.exports = router;

