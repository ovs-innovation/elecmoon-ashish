const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviewsByProduct,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} = require("../controller/reviewController");

// frontend routes
router.post("/add", addReview);
router.get("/product/:id", getReviewsByProduct);

// admin routes
router.get("/", getAllReviews);
router.put("/:id", updateReviewStatus);
router.delete("/:id", deleteReview);

module.exports = router;
