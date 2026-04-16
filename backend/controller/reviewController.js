const Review = require("../models/Review");

const addReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(200).send({
      message: "Review Added Successfully!",
      review: newReview,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id, status: "show" }).sort({ createdAt: -1 });
    res.send(reviews);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate("product", "title image").sort({ _id: -1 });
    res.send(reviews);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateReviewStatus = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).send({ message: "Review not found!" });
    }

    // Check ownership if it's a user review and not an admin update (simplified for now)
    // If user is provided in body, we check if it matches the stored user
    if (req.body.user && review.user && review.user.toString() !== req.body.user) {
      return res.status(403).send({ message: "You are not authorized to edit this review!" });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send({ message: "Review Updated Successfully", review: updatedReview });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).send({ message: "Review not found!" });
    }

    // If userId is provided in query or body (frontend should send it), check ownership
    const userId = req.body.userId || req.query.userId;
    if (userId && review.user && review.user.toString() !== userId) {
      return res.status(403).send({ message: "You are not authorized to delete this review!" });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.send({ message: "Review Deleted Successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addReview,
  getReviewsByProduct,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
};
