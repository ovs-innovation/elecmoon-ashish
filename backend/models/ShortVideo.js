const mongoose = require("mongoose");

const shortVideoSchema = new mongoose.Schema(
  {
    title: {
      type: Object, // Multiple languages support
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    status: {
      type: String,
      lowercase: true,
      default: "show",
      enum: ["show", "hide"],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ShortVideo = mongoose.model("ShortVideo", shortVideoSchema);
module.exports = ShortVideo;
