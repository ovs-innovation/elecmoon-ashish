const express = require("express");
const router = express.Router();
const {
  addShortVideo,
  getAllShortVideos,
  getShowingShortVideos,
  getShortVideoById,
  updateShortVideo,
  updateStatus,
  deleteShortVideo,
} = require("../controller/shortVideoController");

// Add a short video
router.post("/add", addShortVideo);

// Get all short videos (for admin)
router.get("/all", getAllShortVideos);

// Get showing short videos (for frontend)
router.get("/show", getShowingShortVideos);

// Get a short video by id
router.get("/:id", getShortVideoById);

// Update a short video
router.put("/:id", updateShortVideo);

// Update status
router.put("/status/:id", updateStatus);

// Delete a short video
router.delete("/active/:id", deleteShortVideo);

module.exports = router;
