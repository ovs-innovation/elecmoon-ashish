const express = require("express");
const router = express.Router();
const {
  addBlog,
  getAllBlogs,
  getShowingBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  updateStatus,
  deleteBlog,
} = require("../controller/blogController");

// Public routes
router.get("/show", getShowingBlogs);
router.get("/slug/:slug", getBlogBySlug);

// Admin routes
router.post("/add", addBlog);
router.get("/", getAllBlogs);
router.post("/:id", getBlogById);
router.patch("/:id", updateBlog);
router.put("/status/:id", updateStatus);
router.delete("/:id", deleteBlog);

module.exports = router;

